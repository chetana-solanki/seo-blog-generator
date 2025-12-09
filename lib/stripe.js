// Stripe client configuration
import Stripe from 'stripe';

// Initialize Stripe with secret key and API version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Stripe API version
});