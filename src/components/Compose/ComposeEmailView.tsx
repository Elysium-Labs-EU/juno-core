import React from 'react'
import InputBase from '@mui/material/InputBase'
import { CustomButtonText } from '../Elements/Buttons'
import emailValidation from '../../utils/emailValidation'
import * as S from './ComposeStyles'
import * as GS from '../../styles/globalStyles'
import * as local from '../../constants/composeEmailConstants'
import { useAppDispatch } from '../../Store/hooks'
import { SendComposedEmail } from '../../Store/composeSlice'
import { listRemoveDraft, resetDraftDetails } from '../../Store/draftsSlice'
import { Contact } from '../../Store/contactsTypes'
import RecipientField from './ComposeFields/RecipientField'

interface IComposeEmailView {
    bccValue: Contact[]
    bodyValue: string
    ccValue: Contact[]
    draftDetails: any
    handleChangeSubjectBody: any
    handleChangeRecipients: any
    handleDelete: Function
    inputToValue: any
    inputCCValue: any
    inputBCCValue: any
    isReplying: boolean
    isReplyingListener: Function
    saveSuccess: boolean
    setToError: Function
    setShowCC: Function
    setShowBCC: Function
    showBCC: boolean
    showCC: boolean
    setInputToValue: Function
    setInputCCValue: Function
    setInputBCCValue: Function
    subjectValue: string
    toError: boolean
    toValue: Contact[]
}

const ComposeEmailView = (props: IComposeEmailView) => {
    const {
        bccValue,
        bodyValue,
        ccValue,
        draftDetails,
        handleChangeRecipients,
        handleChangeSubjectBody,
        handleDelete,
        inputToValue,
        inputCCValue,
        inputBCCValue,
        isReplying,
        isReplyingListener,
        saveSuccess,
        setToError,
        showBCC,
        showCC,
        setInputToValue,
        setInputCCValue,
        setInputBCCValue,
        setShowBCC,
        setShowCC,
        subjectValue,
        toError,
        toValue
    } = props
    const dispatch = useAppDispatch()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (toValue.length > 0) {
            if (emailValidation(toValue)) {
                dispatch(SendComposedEmail())
                dispatch(resetDraftDetails())
                dispatch(listRemoveDraft({ threadId: draftDetails.message.threadId }))
            } else {
                setToError(true)
            }
        }
    }

    return (
        <S.Wrapper isReplying={isReplying}>
            <S.UpdateContainer>
                {saveSuccess && <span className="text_muted">{local.DRAFT_SAVED}</span>}
            </S.UpdateContainer>
            <S.ComposerContainer>
                <GS.Base>
                    <form onSubmit={onSubmit} autoComplete="off">
                        <div style={{ marginBottom: `7px` }}>
                            <GS.Base>
                                <S.Row>
                                    <RecipientField
                                        recipientFieldValue={toValue}
                                        fieldId={local.TO}
                                        fieldLabel={local.TO_LABEL}
                                        toError={toError}
                                        handleChangeRecipients={handleChangeRecipients}
                                        inputValue={inputToValue}
                                        setInputValue={setInputToValue}
                                        handleDelete={handleDelete}
                                        showField={!isReplying}
                                    />
                                    <S.CcBccContainer>
                                        {!showCC && <CustomButtonText label={local.CC_LABEL} className="button option-link" onClick={() => setShowCC(true)} />}
                                        {!showBCC && <CustomButtonText label={local.BCC_LABEL} className="button option-link" onClick={() => setShowBCC(true)} />}
                                    </S.CcBccContainer>
                                </S.Row>
                                {showCC &&
                                    <S.Row>
                                        <RecipientField
                                            recipientFieldValue={ccValue}
                                            fieldId={local.CC}
                                            fieldLabel={local.CC_LABEL}
                                            toError={toError}
                                            handleChangeRecipients={handleChangeRecipients}
                                            inputValue={inputCCValue}
                                            setInputValue={setInputCCValue}
                                            handleDelete={handleDelete}
                                            showField={showCC}
                                        />
                                    </S.Row>
                                }
                                {showBCC &&
                                    <S.Row>
                                        <RecipientField
                                            recipientFieldValue={bccValue}
                                            fieldId={local.BCC}
                                            fieldLabel={local.BCC_LABEL}
                                            toError={toError}
                                            handleChangeRecipients={handleChangeRecipients}
                                            inputValue={inputBCCValue}
                                            setInputValue={setInputBCCValue}
                                            handleDelete={handleDelete}
                                            showField={showBCC}
                                        />
                                    </S.Row>
                                }
                                <S.Row>
                                    <S.Label hasValue={Boolean(subjectValue)}>
                                        <label htmlFor={local.SUBJECT}>
                                            {local.SUBJECT_LABEL}
                                        </label>
                                    </S.Label>
                                    <InputBase
                                        id={local.SUBJECT}
                                        value={subjectValue ?? ''}
                                        onChange={handleChangeSubjectBody}
                                        fullWidth
                                    />
                                </S.Row>
                                <S.Row>
                                    <S.Label hasValue={Boolean(bodyValue)}>
                                        <label htmlFor={local.BODY}>
                                            {local.BODY_LABEL}
                                        </label>
                                    </S.Label>
                                    <InputBase
                                        id={local.BODY}
                                        multiline
                                        value={bodyValue ?? ''}
                                        onChange={handleChangeSubjectBody}
                                        minRows={12}
                                        maxRows={25}
                                        fullWidth
                                        autoFocus={isReplying}
                                    />
                                </S.Row>
                            </GS.Base>
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
                                onClick={() => isReplyingListener(-1)}
                            />
                        )}
                    </form>
                </GS.Base>
            </S.ComposerContainer>
        </S.Wrapper>
    )
}


export default ComposeEmailView
