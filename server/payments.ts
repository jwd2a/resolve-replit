import Stripe from "stripe";
import { Express } from "express";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil", // Latest API version available
});

export function setupPaymentRoutes(app: Express) {
  // Create a payment intent for course payment
  app.post("/api/create-course-payment", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 14900, // $149.00 in cents
        currency: "usd",
        // In a real app, we would store metadata about the course
        metadata: {
          courseId: "parenting-course-standard",
          courseType: "standard"
        },
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        amount: 14900
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ 
        error: error.message || "Failed to create payment intent" 
      });
    }
  });

  // Update a user's payment status (this would connect to your database in a real app)
  app.post("/api/update-payment-status", (req, res) => {
    const { userId, paymentIntentId, status } = req.body;

    // In a real app, you would update the user's payment status in your database
    // For now, we'll just return success
    res.json({ 
      success: true,
      message: "Payment status updated",
      userId,
      paymentIntentId,
      status
    });
  });

  // Webhook to handle payment events from Stripe
  app.post("/api/webhook", async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'] as string;

    let event;

    // This would verify the webhook signature in a real app
    try {
      // In a real app, you'd have a webhook secret
      // event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
      
      // For now, just parse the payload
      event = payload;
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful:', paymentIntent.id);
      
      // In a real app, you would update your database here
    }

    res.json({ received: true });
  });
}