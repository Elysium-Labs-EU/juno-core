import * as GS from '../../../../styles/globalStyles'
import * as S from './SignatureEmailStyles'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import * as global from '../../../../constants/globalConstants'
import { setActiveModal } from '../../../../store/utilsSlice'
import { MenuSectionComponent } from '../../../MainHeader/Navigation/More/NavigationMore'
import { selectProfile } from '../../../../store/baseSlice'
import removeHTMLTag from '../../../../utils/removeHTMLTag'

const NO_SIGNATURE = 'No signature'
const MANAGE_SIGNATURES = 'Manage signatures'

const partialSignature = (signature: string) => {
  if (signature && signature.length > 30) {
    return `${removeHTMLTag(signature.slice(0, 40))}...`
  }
  return removeHTMLTag(signature)
}

const SignatureEmailOptions = ({
  handleClose,
  setSelectedSignature,
}: {
  handleClose: () => void
  setSelectedSignature: (value: string | null) => void
}) => {
  const { signature } = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  const handleClickOptions = () => {
    handleClose()
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.settings))
  }

  const MENU_SIGNATURE_OPTIONS = [
    {
      title: partialSignature(
        signature && signature.length > 0 ? signature : '(Empty signature)'
      ),
      onClick: () => {
        handleClose()
        setSelectedSignature(signature)
      },
    },
    {
      title: NO_SIGNATURE,
      onClick: () => {
        handleClose()
        setSelectedSignature(null)
      },
    },
  ]
  const MENU_MANAGE_OPTIONS = [
    {
      title: MANAGE_SIGNATURES,
      onClick: () => handleClickOptions(),
    },
  ]

  return (
    <GS.StyledMenu>
      <S.SettingsInner>
        <MenuSectionComponent
          data-test-id="signature-menu"
          menuItems={[MENU_SIGNATURE_OPTIONS, MENU_MANAGE_OPTIONS]}
        />
      </S.SettingsInner>
    </GS.StyledMenu>
  )
}

export default SignatureEmailOptions
