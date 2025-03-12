import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    console.log("Received Email: ", email);

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      );
    }

    // Check if customer already exists
    const customers = await stripe.customers.list({ email });
    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      // Create a new customer if none exists
      customer = await stripe.customers.create({ email });
    }

    // Create a 25% discount coupon for the customer
    const coupon = await stripe.coupons.create({
      percent_off: 25,
      duration: 'once', // Apply the discount only once per invoice
    });

    console.log("Coupon Created:", coupon);

    // Optionally, you can store the coupon ID with the customer for future use
    // For example, store the coupon ID in your database or as metadata in the customer object.

    return new Response(
      JSON.stringify({ customerId: customer.id, couponId: coupon.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating or retrieving customer:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
}
