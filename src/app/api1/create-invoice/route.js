import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { customerId, amount, description,disnew } = body;

    // Log input for debugging
    console.log("Input Data:", { customerId, amount, description });

    // Validate input
    if (!customerId || !amount || !description) {
      return new Response(
        JSON.stringify({ error: "customerId, amount, and description are required." }),
        { status: 400 }
      );
    }

    // Check if the current date is within New Year (e.g., January 1st to 7th)
    
    let coupon = null;
    let discountAmount = 10000;

   
    ; // Amount in cents

    // Create an Invoice
    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: 8,
      footer: `
        PAY WITH ACH OR WIRE TRANSFER

        Bank transfers, also known as ACH payments, can take up to five
        business days. To pay via ACH, transfer funds using the
        following bank information.

        Bank name                                       WELLS FARGO BANK, N.A.
        Routing number                               121000248
        Account number                              40630168845481172
        SWIFT code                                      WFBIUS6S`,
      coupon: coupon ? coupon.id : undefined, // Apply the coupon only if it's created
    });

    console.log("Invoice Created:", invoice);

    // Create Invoice Item for the original amount
    await stripe.invoiceItems.create({
      customer: customerId,
      amount: Math.round(amount * 100), // Original amount in cents
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

    // Finalize the Invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    console.log("Finalized Invoice:", finalizedInvoice);

    if (finalizedInvoice.total === 0) {
      return new Response(
        JSON.stringify({ error: "Invoice total is 0. Check pending invoice items." }),
        { status: 500 }
      );
    }

    // Return Invoice PDF URL
    return new Response(
      JSON.stringify({ invoicePdf: finalizedInvoice.invoice_pdf }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating invoice:", error.message, error.stack);

    // Log Stripe-specific errors
    if (error.type) {
      console.error("Stripe Error Type:", error.type);
      console.error("Stripe Error Code:", error.code);
    }

    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred.",
      }),
      { status: 500 }
    );
  }
}
