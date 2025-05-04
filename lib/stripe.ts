// lib/stripe.ts - Versão simplificada para preview

// Simulação do Stripe
const stripe = {
  checkout: {
    sessions: {
      create: async () => ({
        id: "cs_test_" + Math.random().toString(36).substring(2, 15),
        url: "/success?session_id=simulado",
      }),
    },
    webhooks: {
      constructEvent: () => ({
        type: "checkout.session.completed",
        data: {
          object: {
            id: "cs_test_123",
            payment_intent: "pi_123",
            payment_method_types: ["card"],
            amount_total: 10000,
            customer_details: {
              email: "cliente@exemplo.com",
            },
          },
        },
      }),
    },
  },
}

export default stripe

// Função simulada para criar sessão de checkout
export async function createCheckoutSession(items: any[]) {
  // Simulação de uma sessão de checkout
  return {
    id: "cs_test_" + Math.random().toString(36).substring(2, 15),
    url: "/success?session_id=simulado",
  }
}
