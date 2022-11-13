import { QiEscape } from 'images/svgIcons/quillIcons'
import { ReactNode } from 'react'
import { useAppDispatch } from 'store/hooks'
import { setActiveModal } from 'store/utilsSlice'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import * as S from './CustomModalStyles'

const Content = ({
  children,
  open,
}: {
  children: ReactNode
  open: boolean
}) => {
  const dispatch = useAppDispatch()
  const handleCloseModal = () => {
    if (open) {
      dispatch(setActiveModal(null))
    }
  }

  return (
    <DialogPrimitive.Portal>
      <S.StyledOverlay />
      <S.StyledContent
        onEscapeKeyDown={handleCloseModal}
        onInteractOutside={handleCloseModal}
      >
        {children}
      </S.StyledContent>
    </DialogPrimitive.Portal>
  )
}

// Exports
export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogContent = Content
export const DialogTitle = S.StyledTitle
export const DialogDescription = S.StyledDescription
export const DialogClose = DialogPrimitive.Close

const CustomDialog = ({
  children,
  modalAriaLabel,
  modalTitle,
  open,
  subTitle = undefined,
}: {
  children: JSX.Element
  modalAriaLabel: string
  modalTitle: string
  open: boolean
  subTitle?: JSX.Element
}) => {
  const dispatch = useAppDispatch()

  return (
    <Dialog
      open={open}
      aria-labelledby={`modal-${modalAriaLabel}`}
      aria-describedby={`modal-${modalAriaLabel}-info`}
    >
      <DialogContent open={open}>
        <S.ModalHeader>
          <S.Inner>
            <S.HeaderRow>
              <DialogTitle>{modalTitle}</DialogTitle>
            </S.HeaderRow>
            {subTitle && subTitle}
          </S.Inner>
        </S.ModalHeader>
        <S.Inner>{children}</S.Inner>
        <DialogClose asChild>
          <S.ModalIconButton
            aria-label="close-keyboard-shortcuts-modal"
            onClick={() => {
              if (open) {
                dispatch(setActiveModal(null))
              }
            }}
            title="Close"
          >
            <QiEscape size={16} />
          </S.ModalIconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog
