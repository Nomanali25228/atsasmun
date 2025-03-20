import Stripe from "stripe";
import nodemailer from "nodemailer";
import { toast } from "react-toastify";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to send email reminders
async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USERNAME,
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
  });

  const mailOptions = { from: process.env.NEXT_PUBLIC_SMTP_USERNAME, to, subject, text };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email Error:", error);
  }
}

// Function to handle invoice lifecycle
async function handleInvoiceLifecycle(invoiceId, customerEmail) {
  setTimeout(async () => {
    try {
      const invoice = await stripe.invoices.retrieve(invoiceId);
      if (invoice.status !== "paid") {
        await sendEmail(
          customerEmail,
          "⚠️ Reminder: Invoice Payment Due",
          `Your invoice #${invoiceId} is due. Please make the payment immediately to avoid service interruption.`
        );
      }

      setTimeout(async () => {
        const updatedInvoice = await stripe.invoices.retrieve(invoiceId);
        if (updatedInvoice.status !== "paid") {
          await stripe.invoices.voidInvoice(invoiceId);
          console.log(`❌ Invoice ${invoiceId} expired after 5 minutes`);
        }
      }, 2 * 60 * 1000);
    } catch (error) {
      console.error("❌ Invoice Lifecycle Error:", error.message);
    }
  }, 3 * 60 * 1000);
}

// Stripe webhook handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "invoice.finalized":
      console.log("✅ Invoice Finalized:", event.data.object.id);
      handleInvoiceLifecycle(event.data.object.id, event.data.object.customer_email);
      break;

    case "invoice.payment_failed":
      sendEmail(
        event.data.object.customer_email,
        "❌ Payment Failed: Action Required",
        `Your payment for invoice #${event.data.object.id} failed. Please update your payment details.`
      );
      break;

    case "invoice.voided":
      console.log(`❌ Invoice ${event.data.object.id} expired`);
      break;

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}

// API route to create an invoice
export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("❌ Invalid JSON:", error.message);
      return new Response(JSON.stringify({ error: "Invalid JSON body." }), { status: 400 });
    }

    const { customerId, amount, description, disnew } = body;

    if (!customerId || !amount || !description) {
      return new Response(
        JSON.stringify({ error: "customerId, amount, and description are required." }),
        { status: 400 }
      );
    }

    let discountAmount = 10000; // Amount in cents

    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: 1,
      auto_advance: true,
      footer: `
        PAY WITH ACH OR WIRE TRANSFER
        Bank name: WELLS FARGO BANK, N.A.
        Routing number: 121000248
        Account number: 40630168845481172
        SWIFT code: WFBIUS6S
      `,
    });

    await stripe.invoiceItems.create({
      customer: customerId,
      amount: Math.round(amount * 100),
      description: `${disnew} ${description}`,
      invoice: invoice.id,
    });

    if (discountAmount > 0) {
      await stripe.invoiceItems.create({
        customer: customerId,
        description: `New Year Discount (-£${(discountAmount / 100).toFixed(2)})`,
        amount: -discountAmount,
        invoice: invoice.id,
      });
    }

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    if (finalizedInvoice.total === 0) {
      return new Response(
        JSON.stringify({ error: "Invoice total is 0. Check pending invoice items." }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Invoice created and sent successfully!", invoicePdf: finalizedInvoice.invoice_pdf }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error creating invoice:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred." }),
      { status: 500 }
    );
  }
}

// **Fix for Unexpected JSON Input Issue**
async function createInvoice(customerId, su, non) {
  try {
    const response = await fetch("/api1/stripe-webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        amount: su + 100,
        description: "Tour Package Payment",
        disnew: non,
      }),
    });

    let responseData;
    try {
      responseData = await response.text();
      responseData = responseData ? JSON.parse(responseData) : null;
    } catch (error) {
      throw new Error("Invalid JSON response from server.");
    }

    if (!response.ok) {
      throw new Error(responseData?.error || "Failed to create invoice");
    }

    const { invoicePdf } = responseData;

    const link = document.createElement("a");
    link.href = invoicePdf;
    link.download = "invoice.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Invoice downloaded successfully!");
  } catch (error) {
    console.error("❌ Error creating invoice:", error.message);
    toast.error("Error creating invoice. Please try again.");
  }
}
