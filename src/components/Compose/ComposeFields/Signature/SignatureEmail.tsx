import { Popper } from '@mui/material'
import { useEffect, useState } from 'react'
import useClickOutside from '../../../../hooks/useClickOutside'
import { selectProfile } from '../../../../store/baseSlice'
import { useAppSelector } from '../../../../store/hooks'
import sanitizeAndParseHtmlContent from '../../../../utils/sanitizeAndParseHtmlContent'
import CustomIconButton from '../../../Elements/Buttons/CustomIconButton'
import SignatureEmailOptions from './SignatureEmailOptions'
import * as S from './SignatureEmailStyles'
import * as local from '../../../../constants/composeEmailConstants'
import * as global from '../../../../constants/globalConstants'
import { QiChevronDown } from '../../../../images/svgIcons/quillIcons'

const SignatureEmail = ({
  updateComposeEmail,
  loadState,
}: {
  updateComposeEmail: (action: { id: string; value: string | null }) => void
  loadState: string
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { ref } = useClickOutside({
    onClickOutside: () => {
      setAnchorEl(null)
    },
  })
  const [selectedSignature, setSelectedSignature] = useState<string | null>(
    null
  )
  const { signature } = useAppSelector(selectProfile)

  useEffect(() => {
    if (global.LOAD_STATE_MAP.loaded === loadState) {
      setSelectedSignature(signature)
    }
  }, [signature, loadState])

  useEffect(() => {
    const updateEventObject = {
      id: local.SIGNATURE,
      value: selectedSignature
        ? `<div data-juno=${global.JUNO_SIGNATURE}>${selectedSignature}</div>`
        : null,
    }
    updateComposeEmail(updateEventObject)
  }, [selectedSignature])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  console.log(selectedSignature)

  return (
    <S.Wrapper>
      <S.SettingsButtonContainer>
        <CustomIconButton
          icon={<QiChevronDown />}
          title="Show signature options"
          onClick={handleClick}
          style={{ marginRight: '20px' }}
        />
      </S.SettingsButtonContainer>
      <Popper
        id="signature-options"
        open={open}
        anchorEl={anchorEl}
        ref={ref}
        placement="bottom-end"
        style={{ zIndex: `var(--z-index-popover)` }}
      >
        <SignatureEmailOptions
          handleClose={handleClose}
          setSelectedSignature={setSelectedSignature}
        />
      </Popper>
      {selectedSignature && (
        <S.ActiveSignatureContainer>
          {sanitizeAndParseHtmlContent(selectedSignature)}
        </S.ActiveSignatureContainer>
      )}
    </S.Wrapper>
  )
}

export default SignatureEmail
