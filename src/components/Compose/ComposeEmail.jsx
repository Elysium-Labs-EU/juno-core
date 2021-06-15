import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import '../../App.scss'
import { useForm } from 'react-hook-form'
// import { createApiClient } from '../../data/api'
import { ComposerContainer, Wrapper } from './ComposeStyles'
import { SendComposedEmail, TrackComposeEmail } from '../../Store/actions'
import useDebounce from '../../Hooks/use-debounce'

// const api = createApiClient()

const TO_LABEL = 'To'
const SUBJECT_LABEL = 'Subject'
const BODY_LABEL = 'Body'
const SEND_BUTTON = 'Send'

const mapStateToProps = (state) => {
  const { composeEmail } = state
  return { composeEmail }
}

const ComposeEmail = ({ composeEmail, dispatch }) => {
  const [toValue, setToValue] = useState('')
  const [subjectValue, setSubjectValue] = useState('')
  const [bodyValue, setBodyValue] = useState('')
  const debouncedToValue = useDebounce(toValue, 500)
  const debouncedSubjectValue = useDebounce(subjectValue, 500)
  const debouncedBodyValue = useDebounce(bodyValue, 500)

  const handleChange = (event) => {
    if (event.target.id === 'to') {
      setToValue(event.target.value)
    }
    if (event.target.id === 'subject') {
      setSubjectValue(event.target.value)
    }
    if (event.target.id === 'body') {
      setBodyValue(event.target.value)
    }
  }

  useEffect(() => {
    if (debouncedToValue) {
      const updateEventObject = { id: 'to', value: debouncedToValue }
      if (!isEmpty(updateEventObject)) {
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
  }, [debouncedToValue])

  useEffect(() => {
    if (debouncedSubjectValue) {
      const updateEventObject = {
        id: 'subject',
        value: debouncedSubjectValue,
      }
      if (!isEmpty(updateEventObject)) {
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
  }, [debouncedSubjectValue])

  useEffect(() => {
    if (debouncedBodyValue) {
      const updateEventObject = { id: 'body', value: debouncedBodyValue }
      if (!isEmpty(updateEventObject)) {
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
  }, [debouncedBodyValue])

  const {
    // register,
    handleSubmit,
    // errors,
  } = useForm({
    defaultValues: {
      from: 'Robbert Tuerlings <robberttg@gmail.com>',
    },
  })

  useEffect(() => {
    if (composeEmail) {
      setToValue(composeEmail.to)
      setSubjectValue(composeEmail.subject)
      setBodyValue(composeEmail.body)
    }
  }, [])

  const onSubmit = () => {
    dispatch(SendComposedEmail())
  }

  return (
    <Wrapper>
      <>
        <ComposerContainer className="composer composerIsVisible">
          <div className="base">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div style={{ marginBottom: `7px` }}>
                <div className="base">
                  <TextField
                    id="to"
                    label={TO_LABEL}
                    value={toValue}
                    onChange={handleChange}
                  />
                  <TextField
                    id="subject"
                    label={SUBJECT_LABEL}
                    value={subjectValue}
                    onChange={handleChange}
                  />
                  <TextField
                    id="body"
                    label={BODY_LABEL}
                    multiline
                    value={bodyValue}
                    onChange={handleChange}
                    rowsMax={25}
                  />
                </div>
              </div>
              {/* <div style={{ marginBottom: `7px` }}>
                <div className="base">
                  <div className="row-1">
                    <div className="label-1">
                      <label htmlFor="to" className="label-base">
                        {TO_LABEL}
                      </label>
                    </div>
                    <input
                      name="to"
                      autoFocus
                      ref={register({ required: true })}
                      className="jsx-3232806250 textareaReset textarea mousetrap"
                    />
                  </div>
                </div>
              </div>
              <div className="row-1">
                <div className="label-1">
                  <label htmlFor="subjectTextarea" className="base">
                    {SUBJECT_LABEL}
                  </label>
                </div>
                <div className="inputContainer">
                  <input
                    // type="text"
                    name="subject"
                    ref={register({ required: true })}
                    // id="subjectTextarea"
                    // tabIndex="2"
                    // spellCheck="true"
                    className="jsx-3232806250 textareaReset textarea mousetrap"
                  />
                </div>
              </div>
              <div className="row-1">
                <div className="label-1">
                  <label htmlFor="bodyTextarea" className="base">
                    {BODY_LABEL}
                  </label>
                </div>
                <div className="inputContainer">
                  <textarea
                    data-provide="markdown"
                    style={{ minHeight: '20rem' }}
                    name="body"
                    ref={register({ required: true })}
                    className="jsx-3232806250 textareaReset textarea mousetrap"
                  />
                </div>
              </div> */}
              <button className="btn btn-sm btn-light" type="submit">
                {SEND_BUTTON}
              </button>
            </form>
          </div>
        </ComposerContainer>
      </>
    </Wrapper>
  )
}

export default connect(mapStateToProps)(ComposeEmail)
