import { useEffect, useMemo, useState } from 'react'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import Menu from 'components/Elements/Menu/Menu'
import type { IMenuItemCollection } from 'components/Elements/Menu/MenuTypes'
import * as local from 'constants/composeEmailConstants'
import * as global from 'constants/globalConstants'
import { QiChevronDown } from 'images/svgIcons/quillIcons'
import { selectProfile } from 'store/baseSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectActiveModal, setActiveModal } from 'store/utilsSlice'
import removeHTMLTag from 'utils/removeHTMLTag'
import sanitizeAndParseHtmlContent from 'utils/sanitizeAndParseHtmlContent'

import * as S from './SignatureEmailStyles'

const NO_SIGNATURE = 'No signature'
const MANAGE_SIGNATURES = 'Manage signatures'

const partialSignature = (signature: string) => {
  if (signature && signature.length > 30) {
    return `${removeHTMLTag(signature.slice(0, 40))}...`
  }
  return removeHTMLTag(signature)
}

const SignatureEmail = ({
  updateComposeEmail,
  loadState,
}: {
  updateComposeEmail: (action: { id: string; value: string | null }) => void
  loadState: string
}) => {
  const { signature } = useAppSelector(selectProfile)
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()
  const [selectedSignature, setSelectedSignature] = useState<string | null>(
    null
  )

  const isOpen = activeModal === global.ACTIVE_MODAL_MAP.signature

  const handleClose = () => {
    dispatch(setActiveModal(null))
  }

  const handleOpen = () => {
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.signature))
  }

  useEffect(() => {
    if (global.LOAD_STATE_MAP.loaded === loadState) {
      setSelectedSignature(signature)
    }
  }, [signature, loadState])

  useEffect(() => {
    const updateEventObject = {
      id: local.SIGNATURE,
      value: selectedSignature
        ? `<div class=${global.JUNO_SIGNATURE} data-juno=${global.JUNO_SIGNATURE}>${selectedSignature}</div>`
        : null,
    }
    updateComposeEmail(updateEventObject)
  }, [selectedSignature])

  const handleClickOptions = () => {
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.settings))
  }

  const MENU_SIGNATURE_OPTIONS = useMemo(
    (): IMenuItemCollection => ({
      id: 'signature-menu-options',
      items: [
        {
          id: 'user-signature',
          title: partialSignature(
            signature && signature.length > 0 ? signature : '(Empty signature)'
          ),
          onClick: () => {
            setSelectedSignature(signature)
          },
        },
        {
          id: 'no-signature',
          title: NO_SIGNATURE,
          onClick: () => {
            setSelectedSignature(null)
          },
        },
      ],
    }),
    [signature]
  )

  const MENU_MANAGE_OPTIONS: IMenuItemCollection = {
    id: 'signature-manage-menu-option',
    items: [
      {
        id: 'manage-signature',
        title: MANAGE_SIGNATURES,
        onClick: () => handleClickOptions(),
      },
    ],
  }

  return (
    <S.Wrapper data-cy="signature-field">
      <S.SettingsButtonContainer>
        <Menu
          activeModalTag={global.ACTIVE_MODAL_MAP.signature}
          menuItems={[MENU_SIGNATURE_OPTIONS, MENU_MANAGE_OPTIONS]}
          handleClose={handleClose}
          triggerButton={
            <CustomIconButton
              icon={<QiChevronDown />}
              title="Show signature options"
              onClick={handleOpen}
              ariaHaspopup="true"
              ariaControls={isOpen ? 'menu' : undefined}
              ariaExpanded={isOpen || undefined}
            />
          }
        />
      </S.SettingsButtonContainer>
      {selectedSignature && (
        <S.ActiveSignatureContainer>
          {sanitizeAndParseHtmlContent(selectedSignature)}
        </S.ActiveSignatureContainer>
      )}
    </S.Wrapper>
  )
}

export default SignatureEmail
