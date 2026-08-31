import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const body = await req.json();
    let { customerId, email, amount, description, disnew } = body;

    console.log("Processing invoice for:", { customerId, email, amount });

    // 0. Fallback: If no customerId but we have email, find or create customer
    if ((!customerId || customerId === "undefined" || customerId === "null") && email) {
      console.log("No Customer ID, attempting to find/create by email:", email);
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const newCustomer = await stripe.customers.create({ email });
        customerId = newCustomer.id;
      }
      console.log("Resolved Customer ID:", customerId);
    }

    if (!customerId || customerId === "undefined" || customerId === "null") {
      return new Response(
        JSON.stringify({ error: "A valid Stripe Customer ID or User Email is required." }),
        { status: 400 }
      );
    }

    if (!amount || isNaN(amount)) {
      return new Response(
        JSON.stringify({ error: "A valid amount is required." }),
        { status: 400 }
      );
    }

    const baseAmountCents = Math.round(amount * 100);
    const currency = 'usd';

    // 1. Create the base invoice
    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: 7,
      auto_advance: true,
      currency,
      footer: `
        PAY WITH ACH OR WIRE TRANSFER
        Bank name: WELLS FARGO BANK, N.A.
        Routing number: 121000248
        Account number: 40630168845481172
        SWIFT code: WFBIUS6S
      `,
    });

    // 2. Add package line item
    await stripe.invoiceItems.create({
      customer: customerId,
      amount: baseAmountCents,
      currency,
      description: `${disnew || ""} ${description || "Tour Package Payment"}`.trim(),
      invoice: invoice.id,
    });

    // 3. Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Invoice created successfully!",
        invoicePdf: finalizedInvoice.invoice_pdf,
        invoiceUrl: finalizedInvoice.hosted_invoice_url
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Stripe Invoice Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to create invoice",
        details: error.type || "Unknown Stripe Error"
      }),
      { status: 500 }
    );
  }
}
