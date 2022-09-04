import { Modal } from '@mui/material'
import CustomIconButton from '../Buttons/CustomIconButton'
import * as S from './CustomModalStyles'
import { QiEscape } from '../../../images/svgIcons/quillIcons'

const CustomModal = ({
  open,
  handleClose,
  modalTitle,
  subTitle = undefined,
  modalAriaLabel,
  children,
}: {
  open: boolean
  handleClose: () => void
  modalTitle: string
  subTitle?: JSX.Element
  modalAriaLabel: string
  children: JSX.Element
}) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby={`modal-${modalAriaLabel}`}
    aria-describedby={`modal-${modalAriaLabel}-info`}
  >
    <S.Modal>
      <S.ModalHeader>
        <S.Inner>
          <S.HeaderRow>
            <S.ModalTitle>{modalTitle}</S.ModalTitle>
            <CustomIconButton
              onClick={() => handleClose()}
              aria-label="close-keyboard-shortcuts-modal"
              icon={<QiEscape size={16} />}
              title="Close"
            />
          </S.HeaderRow>
          {subTitle && subTitle}
        </S.Inner>
      </S.ModalHeader>
      <S.Inner>{children}</S.Inner>
    </S.Modal>
  </Modal>
)

export default CustomModal
