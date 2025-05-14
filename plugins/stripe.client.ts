// ~/plugins/stripe.client.ts
import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { loadStripe } from '@stripe/stripe-js';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const stripe = await loadStripe(config.public.stripePublishableKey);
  return {
    provide: {
      stripe,
    },
  };
});
