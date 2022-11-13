interface ImportMetaEnv {
  readonly SENTRY_AUTH_TOKEN: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_BOTPOISON_PUBLIC_KEY: string
  readonly VITE_DISCORD_SOCIAL_URL: string
  readonly VITE_FORMSPARK_FORM_ID: string
  readonly VITE_HEADLESS_FEEDBACK_URL: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
