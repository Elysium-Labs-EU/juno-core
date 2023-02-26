import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

import { QiEscape } from 'images/svgIcons/quillIcons'
import { useAppDispatch } from 'store/hooks'
import { setActiveModal } from 'store/utilsSlice'

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

const Dialog = DialogPrimitive.Root
// const DialogTrigger = DialogPrimitive.Trigger
const DialogContent = Content
const DialogTitle = S.StyledTitle
// const DialogDescription = S.StyledDescription
const DialogClose = DialogPrimitive.Close

interface ICustomDialog<T> {
  children: JSX.Element
  modalAriaLabel: string
  modalTitle: string
  open: boolean
  subTitle?: JSX.Element
  additionalOnClose?: T
}

const CustomDialog = <T extends (...args: any[]) => any>({
  children,
  modalAriaLabel,
  modalTitle,
  open,
  subTitle = undefined,
  additionalOnClose = undefined,
}: ICustomDialog<T>) => {
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
                if (additionalOnClose) {
                  additionalOnClose()
                }
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
