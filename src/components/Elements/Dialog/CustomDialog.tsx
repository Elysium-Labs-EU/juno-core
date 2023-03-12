import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { KeyboardEvent, ReactNode } from 'react'

import { QiEscape } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectInSearch, setActiveModal, setInSearch } from 'store/utilsSlice'

import * as S from './CustomDialogStyles'
import useDynamicHeight from './hooks/useDynamicHeight'
import Stack from '../Stack/Stack'

interface ICustomDialog<T> {
  children: ReactNode
  customOnClose?: T
  disableDefaultOnClose?: boolean
  enableDynamicHeight?: boolean
  modalAriaLabel: string
  modalTitle?: string
  noCloseButton?: boolean
  noContentPadding?: boolean
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  open: boolean
  subTitle?: JSX.Element
}

const Content = <T,>({
  children,
  open,
  inSearch,
  noContentPadding,
  onKeyDown,
  height,
}: Pick<
  ICustomDialog<T>,
  'children' | 'open' | 'noContentPadding' | 'onKeyDown'
> & { inSearch: boolean; height: string }) => {
  const dispatch = useAppDispatch()
  const handleCloseModal = () => {
    if (open) {
      dispatch(setActiveModal(null))
    }
    if (inSearch) {
      dispatch(setInSearch(false))
    }
  }

  return (
    <DialogPrimitive.Portal>
      <S.StyledOverlay />
      <S.StyledContent
        height={height}
        nocontentpadding={noContentPadding ? 'true' : 'false'}
        onEscapeKeyDown={handleCloseModal}
        onInteractOutside={handleCloseModal}
        onKeyDown={onKeyDown}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {children}
      </S.StyledContent>
    </DialogPrimitive.Portal>
  )
}

const Dialog = DialogPrimitive.Root
const DialogContent = Content
const DialogTitle = S.StyledTitle
const DialogClose = DialogPrimitive.Close

/**
 * Displays a modal dialog with the provided content.
 * @param {string} modalContent - The content to display within the modal dialog.
 * @param {string} modalAriaLabel - The aria-label for the modal dialog, if enableDynamicHeight is true, should be unique within the system.
 * @param {boolean} enableDynamicHeight - Whether to enable dynamic height for the modal dialog. If true, modalAriaLabel must be unique within the system.
 * @param {function} onClose - A function to call when the modal is closed.
 * @return {void}
 */

const CustomDialog = <T extends (...args: any[]) => any>({
  children,
  customOnClose = undefined,
  disableDefaultOnClose = false,
  enableDynamicHeight = false,
  modalAriaLabel,
  modalTitle = undefined,
  noCloseButton = false,
  noContentPadding = false,
  onKeyDown = undefined,
  open,
  subTitle = undefined,
}: ICustomDialog<T>) => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)
  const contentID = `modal-${modalAriaLabel}-content`
  const modalRef = document.getElementById(contentID)
  const height = useDynamicHeight({ children, enableDynamicHeight, modalRef })

  return (
    <Dialog
      aria-describedby={`modal-${modalAriaLabel}-box`}
      aria-labelledby={`modal-${modalAriaLabel}`}
      open={open}
    >
      <DialogContent
        inSearch={inSearch}
        noContentPadding={noContentPadding}
        onKeyDown={onKeyDown}
        open={open}
        height={height}
      >
        {modalTitle ? (
          <S.ModalHeader>
            <Stack
              direction="vertical"
              style={{ marginBottom: 'var(--spacing-1)' }}
            >
              <DialogTitle>{modalTitle}</DialogTitle>

              {subTitle && subTitle}
            </Stack>
          </S.ModalHeader>
        ) : null}
        <Stack direction="vertical" spacing="none" id={contentID}>
          {children}
        </Stack>
        {noCloseButton ? null : (
          <DialogClose asChild>
            <S.ModalIconButton
              aria-label={`close-${modalAriaLabel}-modal`}
              onClick={() => {
                if (open) {
                  if (customOnClose) {
                    customOnClose()
                  }
                  if (!disableDefaultOnClose) {
                    dispatch(setActiveModal(null))
                  }
                }
              }}
              title="Close"
            >
              <QiEscape size={16} />
            </S.ModalIconButton>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog
