import styled from 'styled-components'
import './../App.scss'

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

function ComposeEmail() {
  return (
    <Wrapper>
      <div>
        <ComposerContainer className="composer composerIsVisible">
          <div className="base">
            <div style={{ marginBottom: `7px` }}>
              <div className="base">
                <div className="row-1">
                  <div className="label-1">
                    <label htmlFor="to" className="label-base">
                      To
                    </label>
                  </div>
                  <div className="input">
                    <div data-focus-on-click="true" className="input-base">
                      <div className="wrapper-participants praticipantsInput">
                        <div className="react-autosuggest__container">ReactAutoSuggest</div>
                      </div>
                      <div className="ccBcc">
                        <div className="ccBccButtons">
                          <button className="ccBccButton">CC</button>
                          <button className="ccBccButton">BCC</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-1 rowEmailInput">
              <div className="label-1">
                <label htmlFor="fromTextarea" className="base baseIsDimmed">
                  From
                </label>
              </div>
              <div className="jsx-3232806250 inputContainer">
                <div className="jsx-785063291 base">
                  <div className="jsx-785063291 button">
                    <label>robberttg@gmail.com</label>
                    <select tabIndex="2" className="select">
                      <option value="R Tuerlings <robberttg@gmail.com>" className="jsx-785063291">
                        R Tuerlings &lt;robberttg@gmail.com&gt;
                      </option>
                    </select>
                  </div>
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
                  type="text"
                  id="subjectTextarea"
                  tabIndex="2"
                  spellCheck="true"
                  className="jsx-3232806250 textareaReset textarea mousetrap"
                  value=""
                  placeholder="sub"
                />
              </div>
            </div>
            <div className="row-1">
              <div className="label-1">
                <label htmlFor="bodyTextarea" className="base">
                  Body
                </label>
              </div>
              <div className="inputContainer">Input field</div>
            </div>
            <div className="row-1">
              <div className="signatureLabel">Dropdown to be made</div>
              <div className="inputContainer inputContainerDimmed inputContainerSignature">
                Input field
              </div>
            </div>
            <div className="attachmentList"></div>
            <div style={{ marginTop: `10px`, opacity: `0` }}>
              <div className="dnd-base">
                <span className="label">Drop here to attach</span>
              </div>
            </div>
          </div>
        </ComposerContainer>
      </div>
    </Wrapper>
  )
}

export default ComposeEmail
