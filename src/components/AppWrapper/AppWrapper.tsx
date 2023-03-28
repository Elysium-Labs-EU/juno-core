import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Seo from 'components/Elements/Seo'
import NoMobileOverlay from 'components/NoMobileOverlay/noMobileOverlay'

interface IAppWrapper {
  children: ReactNode
  headerTitle: string
}

const SHOW_TOAST_3_SECONDS = 3000

const AppWrapper = ({ children, headerTitle }: IAppWrapper) => (
  <>
    <Toaster
      position="bottom-left"
      toastOptions={{
        duration: SHOW_TOAST_3_SECONDS,
      }}
    />
    <NoMobileOverlay />
    <Seo title={headerTitle} />
    {children}
  </>
)

export default AppWrapper
