import React from 'react'
import InputBase from '@mui/material/InputBase'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { CustomButtonText } from '../Elements/Buttons'
import emailValidation from '../../utils/emailValidation'
import * as S from './ComposeStyles'
import * as GS from '../../styles/globalStyles'
import * as local from '../../constants/composeEmailConstants'
import { useAppDispatch } from '../../Store/hooks'
import { SendComposedEmail } from '../../Store/composeSlice'
import { listRemoveDraft, resetDraftDetails } from '../../Store/draftsSlice'
import EmailInput from './ComposeFields/EmailInput'
import { Contact } from '../../Store/contactsTypes'

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
                                    <S.Label hasValue={toValue && Object.keys(toValue).length > 0}>
                                        <label htmlFor={local.TO}>
                                            {local.TO_LABEL}
                                        </label>
                                    </S.Label>
                                    <FormControl error={toError} fullWidth>
                                        <EmailInput
                                            id={local.TO}
                                            valueState={toValue}
                                            handleChange={handleChangeRecipients}
                                            inputValue={inputToValue}
                                            setInputValue={setInputToValue}
                                            handleDelete={handleDelete}
                                            willAutoFocus={!isReplying}
                                        />
                                        {toError && (
                                            <FormHelperText id="component-helper-text">
                                                {local.EMAIL_WARNING}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <S.CcBccContainer>
                                        {!showCC && <CustomButtonText label="CC" className="button option-link" onClick={() => setShowCC(true)} />}
                                        {!showBCC && <CustomButtonText label="BCC" className="button option-link" onClick={() => setShowBCC(true)} />}
                                    </S.CcBccContainer>
                                </S.Row>
                                {showCC && <S.Row>
                                    <S.Label hasValue={ccValue && Object.keys(ccValue).length > 0}>
                                        <label htmlFor={local.CC}>
                                            {local.CC_LABEL}
                                        </label>
                                    </S.Label>
                                    <FormControl error={toError} fullWidth>
                                        <EmailInput
                                            id={local.CC}
                                            valueState={ccValue}
                                            handleChange={handleChangeRecipients}
                                            inputValue={inputCCValue}
                                            setInputValue={setInputCCValue}
                                            handleDelete={handleDelete}
                                            willAutoFocus={showCC}
                                        />
                                        {toError && (
                                            <FormHelperText id="component-helper-text">
                                                {local.EMAIL_WARNING}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </S.Row>}
                                {showBCC &&
                                    <S.Row>
                                        <S.Label hasValue={bccValue && Object.keys(bccValue).length > 0}>
                                            <label htmlFor={local.BCC}>
                                                {local.BCC_LABEL}
                                            </label>
                                        </S.Label>
                                        <FormControl error={toError} fullWidth>
                                            <EmailInput
                                                id={local.BCC}
                                                valueState={bccValue}
                                                handleChange={handleChangeRecipients}
                                                inputValue={inputBCCValue}
                                                setInputValue={setInputBCCValue}
                                                handleDelete={handleDelete}
                                                willAutoFocus={showBCC}
                                            />
                                            {toError && (
                                                <FormHelperText id="component-helper-text">
                                                    {local.EMAIL_WARNING}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </S.Row>}
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
