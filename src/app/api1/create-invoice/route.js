import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { customerId, amount, description, disnew } = body;

    if (!customerId || !amount || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let discountAmount = 10000; // Amount in cents

    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: 1,
      auto_advance: true,
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

    return NextResponse.json(
      { message: "Invoice created and sent!", invoicePdf: finalizedInvoice.invoice_pdf },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
