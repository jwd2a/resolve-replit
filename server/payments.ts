import Stripe from "stripe";
import { Express } from "express";

// Comment out Stripe requirement for prototype
// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2025-04-30.basil", // Latest API version available
// });

export function setupPaymentRoutes(app: Express) {
  // Mock payment endpoints for prototype
  
  // Create a payment intent for course payment
  app.post("/api/create-course-payment", async (req, res) => {
    // Mock payment intent response
    res.json({ 
      clientSecret: "pi_mock_client_secret_for_prototype",
      amount: 14900
    });
  });

  // Update a user's payment status (mock)
  app.post("/api/update-payment-status", (req, res) => {
    const { userId, paymentIntentId, status } = req.body;

    // Mock success response
    res.json({ 
      success: true,
      message: "Payment status updated (mock)",
      userId,
      paymentIntentId,
      status
    });
  });

  // Mock webhook endpoint
  app.post("/api/webhook", async (req, res) => {
    // Mock webhook response
    res.json({ received: true });
  });
}