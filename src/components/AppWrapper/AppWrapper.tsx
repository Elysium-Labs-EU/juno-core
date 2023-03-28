import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Seo from 'components/Elements/Seo'
import NoMobileOverlay from 'components/NoMobileOverlay/noMobileOverlay'

interface IAppWrapper {
  children: ReactNode
  headerTitle: string
}

const AppWrapper = ({ children, headerTitle }: IAppWrapper) => (
  <>
    <Toaster position="bottom-left" />
    <NoMobileOverlay />
    <Seo title={headerTitle} />
    {children}
  </>
)

export default AppWrapper
