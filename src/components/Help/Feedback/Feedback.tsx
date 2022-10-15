import { useCallback, useEffect, useState } from 'react'

import TextareaAutosize from '@mui/material/TextareaAutosize'

import * as global from '../../../constants/globalConstants'
import feedbackApi, { ISendFeedback } from '../../../data/feedbackApi'
import {
  QiChat,
  QiCheckmark,
  QiGift,
  QiWarningAlt,
} from '../../../images/svgIcons/quillIcons'
import { selectProfile } from '../../../store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  selectActiveModal,
  setActiveModal,
  setSystemStatusUpdate,
} from '../../../store/utilsSlice'
import * as GS from '../../../styles/globalStyles'
import CustomButton from '../../Elements/Buttons/CustomButton'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import CustomModal from '../../Elements/Modal/CustomModal'
import * as S from './FeedbackStyles'

interface IFeedbackTypeMapItem {
  [key: string]: 'BUG' | 'FEEDBACK' | 'IDEA'
}

const FEEDBACK_TYPE_MAP: IFeedbackTypeMapItem[] = [
  { type: 'BUG' },
  { type: 'FEEDBACK' },
  { type: 'IDEA' },
]

const ICON_MAP: { [key: string]: JSX.Element } = {
  BUG: <QiWarningAlt />,
  FEEDBACK: <QiChat />,
  IDEA: <QiGift />,
}

const customStyles = {
  background: 'var(--color-white)',
  padding: '10px 12px',
  borderRadius: '4px',
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 10px`,
  lineHeight: 1,
  border: '1px solid var(--color-neutral-200)',
}
const customStylesActive = {
  background: 'var(--color-black)',
  color: 'var(--color-white)',
  padding: '10px 12px',
  borderRadius: '4px',
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 10px`,
  lineHeight: 1,
  border: '1px solid var(--color-neutral-200)',
}

const MODAL_TITLE = 'Send feedback'
const MODAL_SUB_TITLE =
  'Your feedback is highly appreciated. We are here to get this right for you.'
const FEEDBACK_TEXT_AREA_PLACEHOLDER =
  'How can Juno improve for you? (If you are reporting a bug, how did it happen?)'
const SUCCESS_MESSAGE = 'Thank you for submitting the feedback!'

const Feedback = () => {
  const [selectedType, setSelectedType] = useState<IFeedbackTypeMapItem>(
    FEEDBACK_TYPE_MAP[0]
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
    setSelectedType(FEEDBACK_TYPE_MAP[0])
  }, [])

  const sendData = useCallback(async (body: ISendFeedback) => {
    try {
      const response = await feedbackApi().sendFeedback(body)
      if (response?.status === 200) {
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
    const body: ISendFeedback = {
      type: selectedType.type,
      message: textAreaValue,
      email: emailAddress,
    }
    sendData(body)
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
      open={activeModal === global.ACTIVE_MODAL_MAP.feedback}
      handleClose={handleClose}
      modalTitle={MODAL_TITLE}
      modalAriaLabel="feedback"
      subTitle={
        <GS.TextMutedParagraph>{MODAL_SUB_TITLE}</GS.TextMutedParagraph>
      }
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
                {FEEDBACK_TYPE_MAP.map((option, index) => (
                  <CustomIconButton
                    key={option.type}
                    title={option.type.toLowerCase()}
                    icon={ICON_MAP[option.type]}
                    style={
                      option.type === selectedType.type
                        ? customStylesActive
                        : customStyles
                    }
                    onClick={() => setSelectedType(FEEDBACK_TYPE_MAP[index])}
                  />
                ))}
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
              label={`Submit ${selectedType.type.toLowerCase()}`}
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
