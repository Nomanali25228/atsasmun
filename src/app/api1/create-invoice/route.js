import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    let discountAmount = 10000; // $100.00 in cents
    const currency = 'usd'; // ✅ Set this once

    // Step 1: Create invoice
    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: 6,
      auto_advance: true,
      currency, // ✅ Set currency here for safety
      footer: `
        PAY WITH ACH OR WIRE TRANSFER

        Bank transfers, also known as ACH payments, can take up to five
        business days. To pay via ACH, transfer funds using the
        following bank information.

        Bank name:                           WELLS FARGO BANK, N.A.
        Routing number:                      121000248
        Account number:                     40630168845481172
        SWIFT code:                         WFBIUS6S
      `,
    });

    console.log("Invoice Created:", invoice);

    // Step 2: Create original invoice item
    await stripe.invoiceItems.create({
      customer: customerId,
      amount: Math.round(amount * 100),
      currency, // ✅ Use same currency
      description: `${disnew} ${description}`,
      invoice: invoice.id,
    });

    console.log("Original Invoice Item Created");

    // Step 3: Add discount if applicable
    if (discountAmount > 0) {
      await stripe.invoiceItems.create({
        customer: customerId,
        amount: -discountAmount,
        currency, // ✅ Use same currency
        description: `New Year Discount (-$${(discountAmount / 100).toFixed(2)})`,
        invoice: invoice.id,
      });

      console.log("Discount Invoice Item Created");
    }

    // Step 4: Finalize invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    console.log("Finalized Invoice:", finalizedInvoice);

    if (finalizedInvoice.total === 0) {
      return new Response(
        JSON.stringify({ error: "Invoice total is 0. Check pending invoice items." }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Invoice created and sent successfully!",
        invoicePdf: finalizedInvoice.invoice_pdf,
      }),
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
