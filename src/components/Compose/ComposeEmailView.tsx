import React from 'react'
import { FiSend } from 'react-icons/fi'
import CustomButton from '../Elements/Buttons/CustomButton'
import emailValidation from '../../utils/emailValidation'
import * as S from './ComposeStyles'
import * as GS from '../../styles/globalStyles'
import * as local from '../../constants/composeEmailConstants'
import StyledTextField from './ComposeFields/EmailInput/EmailInputStyles'
import { useAppDispatch } from '../../Store/hooks'
import { SendComposedEmail } from '../../Store/composeSlice'
import { listRemoveDraft, resetDraftDetails } from '../../Store/draftsSlice'
import { Contact } from '../../Store/contactsTypes'
import RecipientField from './ComposeFields/RecipientField'
import QuilBody from './ComposeFields/QuillBody/QuilBody'

interface IComposeEmailView {
    bccValue: Contact[]
    bodyValue: string
    ccValue: Contact[]
    draftDetails: any
    handleChangeSubject: any
    handleChangeRecipients: any
    handleDelete: Function
    inputToValue: any
    inputCCValue: any
    inputBCCValue: any
    isReplying: boolean | undefined
    isReplyingListener: Function | undefined
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
        handleChangeSubject,
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
        <S.Wrapper isReplying={isReplying ?? false}>
            <S.UpdateContainer>
                {saveSuccess && <GS.TextMutedSpan>{local.DRAFT_SAVED}</GS.TextMutedSpan>}
            </S.UpdateContainer>
            <S.ComposerContainer isReplying={isReplying ?? false}>
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
                                        {!showCC && <CustomButton label={local.CC_LABEL} onClick={() => setShowCC(true)} />}
                                        {!showBCC && <CustomButton label={local.BCC_LABEL} onClick={() => setShowBCC(true)} />}
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
                                    <StyledTextField
                                        id={local.SUBJECT}
                                        value={subjectValue ?? ''}
                                        onChange={handleChangeSubject}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </S.Row>
                                <S.Row>
                                    <QuilBody fetchedBodyValue={bodyValue} />
                                </S.Row>
                            </GS.Base>
                        </div>
                        <CustomButton
                            type="submit"
                            label={local.SEND_BUTTON}
                            disabled={!toValue}
                            icon={<FiSend />}
                            suppressed
                        />
                        {isReplying && isReplyingListener && (
                            <CustomButton
                                label={local.CANCEL_BUTTON}
                                onClick={() => isReplyingListener(-1)}
                                suppressed
                            />
                        )}
                    </form>
                </GS.Base>
            </S.ComposerContainer>
        </S.Wrapper>
    )
}


export default ComposeEmailView
