import { z } from 'zod'

const envVariables = z.object({
  SENTRY_AUTH_TOKEN: z.string(),
  VITE_BACKEND_URL: z.string().optional().nullable(),
  VITE_BOTPOISON_PUBLIC_KEY: z.string().optional().nullable(),
  VITE_DISCORD_SOCIAL_URL: z.string().optional().nullable(),
  VITE_DOCUMENTATION_URL: z.string().optional().nullable(),
  VITE_FORMSPARK_FORM_ID: z.string().optional().nullable(),
  VITE_SENTRY_DSN: z.string().optional().nullable(),
  VITE_USE_SESSION: z.string(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> { }
  }
  interface ImportMetaEnv extends z.infer<typeof envVariables> { }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
