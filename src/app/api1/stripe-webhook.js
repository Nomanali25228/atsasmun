import Stripe from "stripe";
import nodemailer from "nodemailer";
import { setTimeout } from "timers/promises";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to send email reminders
async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
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
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email Error:", error);
  }
}

// Function to handle invoice expiration and email reminders
async function handleInvoiceLifecycle(invoiceId, customerEmail) {
  await setTimeout(60 * 1000); // Wait 4 days
  const invoice = await stripe.invoices.retrieve(invoiceId);

  if (invoice.status !== "paid") {
    await sendEmail(
      customerEmail,
      "Reminder: Invoice Payment Due",
      `Your invoice #${invoiceId} is due. Please make the payment to avoid service interruption.`
    );
  }

  await setTimeout(120 * 1000); // Wait 2 more days (total 6 days)
  const updatedInvoice = await stripe.invoices.retrieve(invoiceId);

  if (updatedInvoice.status !== "paid") {
    await stripe.invoices.voidInvoice(invoiceId);
    console.log(`Invoice ${invoiceId} expired after 6 days`);
  }
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
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "invoice.finalized":
      console.log("Invoice Finalized:", event.data.object.id);
      handleInvoiceLifecycle(event.data.object.id, event.data.object.customer_email);
      break;

    case "invoice.payment_failed":
      sendEmail(
        event.data.object.customer_email,
        "Payment Failed: Action Required",
        `Your payment for invoice #${event.data.object.id} failed. Please update your payment details.`
      );
      break;

    case "invoice.voided":
      console.log(`Invoice ${event.data.object.id} expired`);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}

// API route to create an invoice
export async function POST(req) {
  try {
    const body = await req.json();
    const { customerId, amount, description, disnew } = body;

    console.log("Input Data:", { customerId, amount, description });

    if (!customerId || !amount || !description) {
      return new Response(
        JSON.stringify({ error: "customerId, amount, and description are required." }),
        { status: 400 }
      );
    }

    let discountAmount = 10000; // Amount in cents

    // Create an Invoice
    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice", // Ensures invoice is emailed
      days_until_due: 6,
      auto_advance: true, // Automatically finalizes and emails the invoice
      footer: `
        PAY WITH ACH OR WIRE TRANSFER

        Bank transfers, also known as ACH payments, can take up to five
        business days. To pay via ACH, transfer funds using the
        following bank information.

        Bank name:                     WELLS FARGO BANK, N.A.
        Routing number:                     121000248
        Account number:                     40630168845481172
        SWIFT code:                     WFBIUS6S
      `,
    });

    console.log("Invoice Created:", invoice);

    // Create Invoice Item for the original amount
    await stripe.invoiceItems.create({
      customer: customerId,
      amount: Math.round(amount * 100), // Convert amount to cents
      description: `${disnew} ${description}`,
      invoice: invoice.id,
    });

    console.log("Original Invoice Item Created");

    // Create Invoice Item for the discount (negative amount)
    if (discountAmount > 0) {
      await stripe.invoiceItems.create({
        customer: customerId,
        description: `New Year Discount (-£${(discountAmount / 100).toFixed(2)})`,
        amount: -discountAmount,
        invoice: invoice.id,
      });

      console.log("Discount Invoice Item Created");
    }

    // Finalize the Invoice (This triggers Stripe to send the email)
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    console.log("Finalized Invoice:", finalizedInvoice);

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
    console.error("Error creating invoice:", error.message, error.stack);

    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred." }),
      { status: 500 }
    );
  }
}
