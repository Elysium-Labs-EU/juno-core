interface ImportMetaEnv {
  readonly VITE_TOKEN: string
  readonly VITE_CLIENT_ID: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
