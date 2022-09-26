import { useState } from 'react'
import { useFormspark } from '@formspark/use-formspark'
import { FiCheck } from 'react-icons/fi'
import assertNonNullish from '../../../utils/assertNonNullish'
import CustomModal from '../../Elements/Modal/CustomModal'
import * as S from './BetaAccessFormStyles'
import * as GS from '../../../styles/globalStyles'
import { QiLinkOut } from '../../../images/svgIcons/quillIcons'

const FORMSPARK_FORM_ID = import.meta.env.VITE_FORMSPARK_FORM_ID

const BetaAccesForm = ({ betaFormOpen, setBetaFormOpen }: { betaFormOpen: boolean, setBetaFormOpen: (value: boolean) => void }) => {
    // Only assess this when the production version is active
    if (process.env.NODE_ENV === 'production') {
        assertNonNullish(FORMSPARK_FORM_ID, 'FormSpark ID not defined')
    }
    const [submit, submitting] = useFormspark({
        formId: FORMSPARK_FORM_ID
    })
    const [complete, setComplete] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await submit({ message })
            setComplete(true)
        } catch (err) {
            setError(true)
        }
    }

    return (
        <CustomModal open={betaFormOpen}
            modalTitle="Beta Access"
            modalAriaLabel="beta-access-form"
            handleClose={() => setBetaFormOpen(false)}
        >
            <>
                <GS.TextMutedParagraph>Request access to the private beta of Juno. Your email needs to be a Google email address.</GS.TextMutedParagraph>
                <GS.TextMutedParagraph>You can expect a reply on your request within a few hours. If you want to get in direct contact, use the <S.StyledLink href={import.meta.env.VITE_DISCORD_SOCIAL_URL}><QiLinkOut /><span title="Open new tab in your browser with Discord">Discord Community.</span></S.StyledLink></GS.TextMutedParagraph>
                <S.StyledForm onSubmit={onSubmit}>
                    {!complete && (
                        <>
                            <S.StyledInput
                                type="email"
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="enter your email"
                            />
                            <S.SubmitButton type="submit" disabled={submitting}>
                                Request access
                            </S.SubmitButton>
                        </>
                    )}
                    {complete && (
                        <div>
                            <FiCheck size={20} />
                            <span>You will be contacted shortly</span>
                        </div>
                    )}
                </S.StyledForm>
                {error && (
                    <span>
                        Something went wrong, reach out to us on{' '}
                        <a href={import.meta.env.VITE_DISCORD_SOCIAL_URL}>Discord</a>
                    </span>
                )}
            </>
        </CustomModal>
    )
}

export default BetaAccesForm
