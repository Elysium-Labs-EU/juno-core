import type { Toast } from 'react-hot-toast'

export type TToastVariant = 'error' | 'info' | 'success'

export interface TToast {
  button?: JSX.Element
  description?: string
  specificToast: Toast
  title: string
  variant?: TToastVariant
}
