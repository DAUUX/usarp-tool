export const config = {
  /** A URL base da sua API (Backend) */
  baseUrl: import.meta.env.VITE_BASE_URL,

  /** A origem do seu frontend */
  origin: import.meta.env.VITE_ORIGIN,

  /** O modo atual (Vite preenche isso automaticamente) */
  nodeEnv: import.meta.env.MODE, // 'development' ou 'production'

  /** Útil para saber se estamos em produção */
  isProduction: import.meta.env.PROD,

  /** Útil para saber se estamos em desenvolvimento */
  isDevelopment: import.meta.env.DEV,
};
