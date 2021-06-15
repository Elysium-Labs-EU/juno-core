import React from 'react'
import { connect } from 'react-redux'
import '../../App.scss'
import { useForm } from 'react-hook-form'
import createApiClient from '../../data/api'
import { ComposerContainer, Wrapper } from './ComposeStyles'

const api = createApiClient()

const TO_LABEL = 'To'
const SUBJECT_LABEL = 'Subject'
const BODY_LABEL = 'Body'
const SEND_BUTTON = 'Send'

const ComposeEmail = () => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      from: 'Robbert Tuerlings <robberttg@gmail.com>',
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    api.sendMessage(data)
  }

  return (
    <Wrapper>
      <>
        {/* <ComposerContainer className="composer composerIsVisible">
          <div className="base">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ marginBottom: `7px` }}>
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
              </div>
              <button className="btn btn-sm btn-light" type="submit">
                {SEND_BUTTON}
              </button>
            </form>
          </div>
        </ComposerContainer> */}
      </>
    </Wrapper>
  )
}

export default connect()(ComposeEmail)
