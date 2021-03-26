import styled from 'styled-components'
import './../../App.scss'
import { createApiClient } from '../../data/api'
import { useForm } from 'react-hook-form'

const Wrapper = styled.div`
  max-width: 850px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: static;
`

const ComposerContainer = styled.div`
  padding-top: 120px;
  padding-bottom: 121px;
`

const api = createApiClient()

function ComposeEmail() {
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
        <ComposerContainer className="composer composerIsVisible">
          <div className="base">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ marginBottom: `7px` }}>
                <div className="base">
                  <div className="row-1">
                    <div className="label-1">
                      <label htmlFor="to" className="label-base">
                        To
                      </label>
                    </div>
                    <input
                      name="to"
                      autoFocus
                      ref={register({ required: true})}
                      className="jsx-3232806250 textareaReset textarea mousetrap"
                    />
                  </div>
                </div>
              </div>
              <div className="row-1">
                <div className="label-1">
                  <label htmlFor="subjectTextarea" className="base">
                    Subject
                  </label>
                </div>
                <div className="inputContainer">
                  <input
                    // type="text"
                    name="subject"
                    ref={register({ required: true})}
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
                    Body
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
              <button className="btn btn-sm btn-light" type="submit">Send</button>
            </form>
          </div>
        </ComposerContainer>
      </>
    </Wrapper>
  )
}

export default ComposeEmail
