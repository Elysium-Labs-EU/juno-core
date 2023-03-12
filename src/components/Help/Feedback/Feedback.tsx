import TextareaAutosize from '@mui/material/TextareaAutosize'
import { useCallback, useEffect, useState } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import CustomModal from 'components/Elements/Dialog/CustomDialog'
import * as global from 'constants/globalConstants'
import feedbackApi, { ISendFeedback } from 'data/feedbackApi'
import { QiCheckmark } from 'images/svgIcons/quillIcons'
import { selectProfile } from 'store/baseSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectActiveModal,
  setActiveModal,
  setSystemStatusUpdate,
} from 'store/utilsSlice'
import { Paragraph } from 'styles/globalStyles'

import {
  FEEDBACK_TEXT_AREA_PLACEHOLDER,
  FEEDBACK_TYPE_MAP,
  ICON_MAP,
  MODAL_SUB_TITLE,
  MODAL_TITLE,
  SUCCESS_MESSAGE,
} from './FeedbackConstants'
import * as S from './FeedbackStyles'

export interface IFeedbackTypeMapItem {
  [key: string]: 'BUG' | 'FEEDBACK' | 'IDEA'
}

const Feedback = () => {
  const [selectedType, setSelectedType] = useState<IFeedbackTypeMapItem>(
    FEEDBACK_TYPE_MAP[0] as IFeedbackTypeMapItem
  )
  const [textAreaValue, setTextAreaValue] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { emailAddress } = useAppSelector(selectProfile)
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()

  const handleClose = useCallback(() => {
    setShowSuccess(false)
    setTextAreaValue('')
    dispatch(setActiveModal(null))
    setSelectedType(FEEDBACK_TYPE_MAP[0] as IFeedbackTypeMapItem)
  }, [])

  const sendData = useCallback(async (body: ISendFeedback) => {
    try {
      const response = await feedbackApi().sendFeedback(body)
      if ('status' in response && response?.status === 200) {
        setShowSuccess(true)
      } else {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: global.NETWORK_ERROR,
          })
        )
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: global.NETWORK_ERROR,
        })
      )
    }
  }, [])

  const handleSubmit = useCallback(() => {
    if (selectedType.type && emailAddress) {
      const body: ISendFeedback = {
        type: selectedType.type,
        message: textAreaValue,
        email: emailAddress,
      }
      sendData(body)
    } else {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: global.NETWORK_ERROR,
        })
      )
    }
  }, [selectedType, emailAddress, textAreaValue])

  useEffect(() => {
    let timer: NodeJS.Timer
    if (showSuccess) {
      timer = setTimeout(() => {
        handleClose()
      }, 1200)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [showSuccess])

  return (
    <CustomModal
      modalAriaLabel="feedback"
      modalTitle={MODAL_TITLE}
      open={activeModal === global.ACTIVE_MODAL_MAP.feedback}
      subTitle={<Paragraph muted>{MODAL_SUB_TITLE}</Paragraph>}
    >
      {showSuccess ? (
        <S.SuccessContainer>
          <div>
            <QiCheckmark size={40} />
            <p>{SUCCESS_MESSAGE}</p>
          </div>
        </S.SuccessContainer>
      ) : (
        <>
          <S.Wrapper>
            <S.Inner>
              <S.OptionsWrapper>
                {FEEDBACK_TYPE_MAP.map((option, index) => {
                  if (option?.type) {
                    const icon = ICON_MAP[option.type]
                    const feedbackType = FEEDBACK_TYPE_MAP[index]
                    if (icon && feedbackType) {
                      return (
                        <CustomIconButton
                          key={option.type}
                          title={option.type.toLowerCase()}
                          icon={icon}
                          style={
                            option.type === selectedType.type
                              ? S.customStylesActive
                              : S.customStyles
                          }
                          onClick={() => setSelectedType(feedbackType)}
                        />
                      )
                    }
                  }
                  return undefined
                })}
              </S.OptionsWrapper>
              <TextareaAutosize
                minRows={8}
                maxRows={8}
                placeholder={FEEDBACK_TEXT_AREA_PLACEHOLDER}
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.currentTarget.value)}
                autoFocus
                style={{ resize: 'vertical' }}
                id="textArea"
              />
            </S.Inner>
          </S.Wrapper>
          <S.ButtonContainer>
            <CustomButton
              label={`Submit ${selectedType?.type?.toLowerCase()}`}
              title="Submit feedback form"
              onClick={() => handleSubmit()}
              disabled={textAreaValue.length === 0}
            />
          </S.ButtonContainer>
        </>
      )}
    </CustomModal>
  )
}

export default Feedback
