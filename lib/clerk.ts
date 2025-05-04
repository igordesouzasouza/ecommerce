// lib/clerk.ts - Versão simplificada para preview

// Funções simuladas para autenticação
export async function isAdmin() {
  // Simulando que o usuário é admin para o preview
  return true
}

export async function getCurrentUser() {
  // Simulando um usuário para o preview
  return {
    id: "preview-user",
    firstName: "Admin",
    lastName: "Preview",
    emailAddresses: [{ emailAddress: "admin@atelie.com" }],
  }
}
