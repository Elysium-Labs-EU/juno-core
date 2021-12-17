import React from 'react'
import InputBase from '@mui/material/InputBase'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { CustomButtonText } from '../Elements/Buttons'
import emailValidation from '../../utils/emailValidation'
import * as S from './ComposeStyles'
import * as local from '../../constants/composeEmailConstants'
import * as global from '../../constants/globalConstants'
import { useAppDispatch } from '../../Store/hooks'
import { SendComposedEmail } from '../../Store/composeSlice'
import { listRemoveDraft, resetDraftDetails } from '../../Store/draftsSlice'

interface IComposeEmailView {
    bccValue: string | string[]
    bodyValue: string
    ccValue: string | string[]
    draftDetails: any
    handleChange: any
    isReplying: boolean
    isReplyingListener: Function
    saveSuccess: boolean
    setToError: Function
    setShowCC: Function
    setShowBCC: Function
    showBCC: boolean
    showCC: boolean
    subjectValue: string
    toError: boolean
    toValue: string | string[]
}

const ComposeEmailView = (props: IComposeEmailView) => {
    const { bccValue, bodyValue, ccValue, draftDetails, handleChange, isReplying, isReplyingListener, saveSuccess, setToError, showBCC, showCC, setShowBCC, setShowCC, subjectValue, toError, toValue } = props
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
            <S.ComposerContainer className="composer composerIsVisible">
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
                                            // label={local.TO_LABEL}
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
                                    <S.CcBccContainer>
                                        {!showCC && <CustomButtonText label="CC" className="button option-link" onClick={() => setShowCC(true)} />}
                                        {!showBCC && <CustomButtonText label="BCC" className="button option-link" onClick={() => setShowBCC(true)} />}
                                    </S.CcBccContainer>
                                </S.Row>
                                {showCC && <S.Row>
                                    <S.Label>
                                        <label htmlFor={global.CC} className="label-base">
                                            {local.CC_LABEL}
                                        </label>
                                    </S.Label>
                                    <FormControl error={toError} fullWidth>
                                        <InputBase
                                            id={global.CC}
                                            // label={local.TO_LABEL}
                                            value={ccValue}
                                            onChange={handleChange}
                                            fullWidth
                                            autoFocus={showCC}
                                        />
                                        {toError && (
                                            <FormHelperText id="component-helper-text">
                                                {local.EMAIL_WARNING}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </S.Row>}
                                {showBCC && <S.Row>
                                    <S.Label>
                                        <label htmlFor="bcc" className="label-base">
                                            {local.BCC_LABEL}
                                        </label>
                                    </S.Label>
                                    <FormControl error={toError} fullWidth>
                                        <InputBase
                                            id="bcc"
                                            // label={local.TO_LABEL}
                                            value={bccValue}
                                            onChange={handleChange}
                                            fullWidth
                                            autoFocus={showBCC}
                                        />
                                        {toError && (
                                            <FormHelperText id="component-helper-text">
                                                {local.EMAIL_WARNING}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </S.Row>}
                                <S.Row>
                                    <S.Label>
                                        <label htmlFor="subject" className="label-base">
                                            {local.SUBJECT_LABEL}
                                        </label>
                                    </S.Label>
                                    <InputBase
                                        id="subject"
                                        // label={local.SUBJECT_LABEL}
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
                                        // label={local.BODY_LABEL}
                                        multiline
                                        value={bodyValue ?? ''}
                                        onChange={handleChange}
                                        minRows={12}
                                        maxRows={25}
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
                                onClick={() => isReplyingListener(-1)}
                            />
                        )}
                    </form>
                </div>
            </S.ComposerContainer>
        </S.Wrapper>
    )
}

export default ComposeEmailView
