declare module '@nuxt/schema' {
  interface RuntimeConfig {
    // apiSecret: string
    public: {
      graphqlBaseUrl: string
    }
  }
}
export type Nullable<T> = T | null;

// It is always important to ensure you import/export something when augmenting a type
export {}