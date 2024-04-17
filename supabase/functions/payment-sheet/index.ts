import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { stripe } from "../_utils/stripe.ts";

console.log("Hello from Functions!");

serve(async (req) => {
  try {
    const requestData = await req.json();
    console.log("Received data:", requestData);
    const { amount } = requestData;
    // Create a PaymentIntent so that the SDK can charge the logged in customer.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "inr"
      // customer: customer,
    });
    const res = {
      publishableKey: Deno.env.get("EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
      paymentIntent: paymentIntent.client_secret
      // ephemeralKey: ephemeralKey.secret,
      // customer: customer,
    };
    return new Response(JSON.stringify(res), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
});
