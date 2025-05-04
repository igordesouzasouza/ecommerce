// lib/firebase.ts - Versão simplificada para preview
// Simulação do Firebase para o preview

// Simulação do Firestore
export const db = {
  collection: () => ({
    doc: () => ({
      get: async () => ({
        exists: true,
        data: () => ({}),
        id: "mock-id",
      }),
      set: async () => {},
      update: async () => {},
      delete: async () => {},
    }),
    add: async () => ({ id: "new-doc-id" }),
    where: () => ({
      get: async () => ({
        empty: false,
        docs: [
          {
            id: "mock-id",
            data: () => ({
              name: "Produto Simulado",
              price: 199.9,
              images: ["/placeholder.svg?height=400&width=300"],
            }),
          },
        ],
      }),
    }),
    getDocs: async () => ({
      docs: [
        {
          id: "1",
          data: () => ({
            name: "Vestido Floral",
            description: "Vestido elegante com estampa floral para ocasiões especiais",
            price: 299.9,
            images: ["/placeholder.svg?height=400&width=300"],
            sizes: ["P", "M", "G"],
            colors: ["Azul", "Rosa"],
            category: "vestidos",
            fabric: "algodao",
          }),
        },
        {
          id: "2",
          data: () => ({
            name: "Blusa de Seda",
            description: "Blusa de seda com acabamento artesanal",
            price: 189.9,
            images: ["/placeholder.svg?height=400&width=300"],
            sizes: ["P", "M", "G", "GG"],
            colors: ["Branco", "Preto"],
            category: "blusas",
            fabric: "seda",
          }),
        },
      ],
    }),
  }),
  doc: () => ({
    delete: async () => {},
    update: async () => {},
  }),
}

// Simulação do Storage
export const storage = {
  ref: () => ({
    put: async () => ({
      ref: {
        getDownloadURL: async () => "/placeholder.svg?height=400&width=300",
      },
    }),
  }),
}

// Funções simuladas
export const collection = (db: any, path: string) => db.collection(path)
export const getDocs = (query: any) => query.getDocs()
export const addDoc = (collection: any, data: any) => collection.add(data)
export const deleteDoc = (docRef: any) => docRef.delete()
export const doc = (db: any, path: string, id: string) => db.doc(path, id)
export const ref = (storage: any, path: string) => storage.ref(path)
export const uploadBytes = async (ref: any, file: any) => ref.put(file)
export const getDownloadURL = async (ref: any) => ref.getDownloadURL()
