import Stripe from "stripe";
import nodemailer from "nodemailer";
import { setTimeout } from "timers/promises";
import { NextResponse } from "next/server";

// Email Sending Function
async function sendEmail(to, subject, text) {
  const smtpUser = process.env.NEXT_PUBLIC_SMTP_USERNAME || process.env.SMTP_EMAIL;
  const smtpPass = process.env.NEXT_PUBLIC_SMTP_PASSWORD || process.env.SMTP_PASS;
  const smtpHost = process.env.NEXT_PUBLIC_SMPT_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || process.env.SMTP_PORT || '465');

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = { from: smtpUser, to, subject, text };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email Error:", error);
  }
}

// Invoice Reminder & Expiration Function
async function handleInvoiceLifecycle(stripe, invoiceId, customerEmail) {
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

// Stripe Webhook Handler
export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case "invoice.finalized":
      console.log("Invoice Finalized:", event.data.object.id);
      handleInvoiceLifecycle(stripe, event.data.object.id, event.data.object.customer_email);
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
  // kflkflklfklkflklkf

  return NextResponse.json({ received: true });
}
