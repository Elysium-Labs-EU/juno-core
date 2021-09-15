import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { useHistory, useParams } from 'react-router-dom'
import InputBase from '@material-ui/core/InputBase'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { ComposerContainer, Wrapper } from './ComposeStyles'
import {
  selectComposeEmail,
  SendComposedEmail,
  TrackComposeEmail,
} from '../../Store/composeSlice'
import useDebounce from '../../Hooks/useDebounce'
import * as local from '../../constants/composeEmailConstants'
import * as global from '../../constants/globalConstants'
import * as S from './ComposeStyles'
import emailValidation from '../../utils/emailValidation'
import { CustomButtonText } from '../Elements/Buttons'
import {
  CreateDraft,
  selectDraftDetails,
  UpdateDraft,
} from '../../Store/draftsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'

const ComposeEmail = ({
  isReplying,
  isReplyingListener,
  to,
  subject,
  id,
  threadId,
}) => {
  const composeEmail = useAppSelector(selectComposeEmail)
  const draftDetails = useAppSelector(selectDraftDetails)
  const [toValue, setToValue] = useState([])
  const debouncedToValue = useDebounce(toValue, 500)
  const [subjectValue, setSubjectValue] = useState('')
  const debouncedSubjectValue = useDebounce(subjectValue, 500)
  const [bodyValue, setBodyValue] = useState('')
  const debouncedBodyValue = useDebounce(bodyValue, 500)
  const [toError, setToError] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const dispatch = useAppDispatch()
  const { messageId } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (
      !messageId &&
      Object.values(composeEmail).length > 0 &&
      isEmpty(draftDetails)
    ) {
      dispatch(CreateDraft())
    } else if (!isEmpty(draftDetails) && messageId) {
      dispatch(UpdateDraft())
    } else if (!isEmpty(draftDetails)) {
      dispatch(UpdateDraft())
    }
  }, [composeEmail, messageId])

  useEffect(() => {
    if (!isEmpty(draftDetails)) {
      setSaveSuccess(true)
      setTimeout(() => {
        setSaveSuccess(false)
      }, 2500)
    }
  }, [draftDetails])

  const handleChange = (event) => {
    if (event.target.id === global.TO) {
      setToValue(event.target.value)
    }
    if (event.target.id === global.SUBJECT) {
      setSubjectValue(event.target.value)
    }
    if (event.target.id === global.BODY) {
      setBodyValue(event.target.value)
    }
  }

  useEffect(() => {
    if (debouncedToValue && debouncedToValue.length > 0) {
      if (emailValidation(debouncedToValue)) {
        const updateEventObject = { id: global.TO, value: debouncedToValue }
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
  }, [debouncedToValue])

  useEffect(() => {
    if (debouncedSubjectValue) {
      const updateEventObject = {
        id: global.SUBJECT,
        value: debouncedSubjectValue,
      }
      dispatch(TrackComposeEmail(updateEventObject))
    }
  }, [debouncedSubjectValue])

  useEffect(() => {
    if (debouncedBodyValue) {
      const updateEventObject = { id: global.BODY, value: debouncedBodyValue }
      dispatch(TrackComposeEmail(updateEventObject))
    }
  }, [debouncedBodyValue])

  useEffect(() => {
    if (composeEmail) {
      setToValue(composeEmail.to)
      setSubjectValue(composeEmail.subject)
      setBodyValue(composeEmail.body)
    }
    if (to || subject) {
      to && setToValue(to)
      subject && setSubjectValue(subject)
    }
  }, [])

  useEffect(() => {
    if (id) {
      const updateEventObject = {
        id: 'id',
        value: id,
      }
      dispatch(TrackComposeEmail(updateEventObject))
    }
  }, [id])

  useEffect(() => {
    if (threadId) {
      const updateEventObject = {
        id: 'threadId',
        value: threadId,
      }
      dispatch(TrackComposeEmail(updateEventObject))
    }
  }, [threadId])

  const onSubmit = (e) => {
    e.preventDefault()
    if (toValue.length > 0) {
      if (emailValidation(toValue)) {
        dispatch(SendComposedEmail({ history, messageId }))
      } else {
        setToError(true)
      }
    }
  }

  return (
    <Wrapper isReplying={isReplying}>
      <>
        <S.UpdateContainer>
          {saveSuccess && (
            <span className="text_muted">{local.DRAFT_SAVED}</span>
          )}
        </S.UpdateContainer>
        <ComposerContainer className="composer composerIsVisible">
          <div className="base">
            <form onSubmit={onSubmit} autoComplete="off">
              <div style={{ marginBottom: `7px` }}>
                <div className="base">
                  <S.Row>
                    <S.Label>
                      <label htmlFor="to" className="label-base">
                        {local.TO_LABEL}
                      </label>
                    </S.Label>
                    <FormControl error={toError} fullWidth>
                      <InputBase
                        id="to"
                        label={local.TO_LABEL}
                        value={toValue ?? []}
                        onChange={handleChange}
                        required
                        fullWidth
                        autoFocus={!isReplying}
                      />
                      {toError && (
                        <FormHelperText id="component-helper-text">
                          {local.EMAIL_WARNING}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </S.Row>
                  <S.Row>
                    <S.Label>
                      <label htmlFor="subject" className="label-base">
                        {local.SUBJECT_LABEL}
                      </label>
                    </S.Label>
                    <InputBase
                      id="subject"
                      label={local.SUBJECT_LABEL}
                      value={subjectValue ?? ''}
                      onChange={handleChange}
                      fullWidth
                    />
                  </S.Row>
                  <S.Row>
                    <S.Label>
                      <label htmlFor="body" className="label-base">
                        {local.BODY_LABEL}
                      </label>
                    </S.Label>
                    <InputBase
                      id="body"
                      label={local.BODY_LABEL}
                      multiline
                      value={bodyValue ?? ''}
                      onChange={handleChange}
                      rows={12}
                      rowsMax={25}
                      fullWidth
                      autoFocus={isReplying}
                    />
                  </S.Row>
                </div>
              </div>
              <CustomButtonText
                type="submit"
                className="button button-small button-light"
                label={local.SEND_BUTTON}
                disabled={!toValue}
              />
              {isReplying && (
                <CustomButtonText
                  className="button button-small"
                  label={local.CANCEL_BUTTON}
                  onClick={isReplyingListener}
                />
              )}
            </form>
          </div>
        </ComposerContainer>
      </>
    </Wrapper>
  )
}

export default ComposeEmail
