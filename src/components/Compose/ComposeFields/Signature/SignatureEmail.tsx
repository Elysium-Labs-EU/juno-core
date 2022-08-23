import { Popper } from '@mui/material'
import { useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import useClickOutside from '../../../../hooks/useClickOutside'
import { selectProfile } from '../../../../store/baseSlice'
import { useAppSelector } from '../../../../store/hooks'
import sanitizeAndParseHtmlContent from '../../../../utils/sanitizeAndParseHtmlContent'
import CustomIconButton from '../../../Elements/Buttons/CustomIconButton'
import SignatureEmailOptions from './SignatureEmailOptions'
import * as S from './SignatureEmailStyles'
import * as local from '../../../../constants/composeEmailConstants'
import * as global from '../../../../constants/globalConstants'

const SignatureEmail = ({
  callback,
}: {
  callback: (action: { id: string, value: string | null }, mounted: boolean) => void
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
    setSelectedSignature(signature)
  }, [signature])

  useEffect(() => {
    let mounted = true
    const updateEventObject = {
      id: local.SIGNATURE,
      value: selectedSignature ? `<div data-juno=${ global.JUNO_SIGNATURE }>${ selectedSignature
        }</div>` : null,
    }
    callback(updateEventObject, mounted)
    return () => {
      mounted = false
    }
  }, [selectedSignature])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <S.Wrapper>
      <CustomIconButton
        icon={<FiChevronDown />}
        title="Show signature options"
        onClick={handleClick}
        style={{ marginRight: '20px' }}
      />
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
      {selectedSignature && sanitizeAndParseHtmlContent(selectedSignature)}
    </S.Wrapper>
  )
}

export default SignatureEmail
