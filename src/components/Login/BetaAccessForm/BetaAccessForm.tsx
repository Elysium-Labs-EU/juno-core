import Botpoison from '@botpoison/browser'
import { useFormspark } from '@formspark/use-formspark'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { FiCheck } from 'react-icons/fi'

import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import CustomModal from 'components/Elements/Dialog/CustomDialog'
import * as global from 'constants/globalConstants'
import { QiLinkOut } from 'images/svgIcons/quillIcons'
import { useAppSelector } from 'store/hooks'
import { selectActiveModal } from 'store/utilsSlice'
import { Paragraph, Span } from 'styles/globalStyles'

import * as S from './BetaAccessFormStyles'

const FORMSPARK_FORM_ID = import.meta.env.VITE_FORMSPARK_FORM_ID
const DISCORD_SOCIAL_URL = import.meta.env.VITE_DISCORD_SOCIAL_URL
const BOTPOSION_PUBLIC_KEY = import.meta.env.VITE_BOTPOISON_PUBLIC_KEY

const botpoison = new Botpoison({
  publicKey: BOTPOSION_PUBLIC_KEY ?? '',
})

const BetaAccesForm = () => {
  if (!FORMSPARK_FORM_ID) {
    return null
  }

  const activeModal = useAppSelector(selectActiveModal)
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  })
  const [complete, setComplete] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { solution } = await botpoison.challenge()
      await submit({ message, _botpoison: solution })
      setComplete(true)
    } catch (err) {
      setError(true)
    }
  }

  return (
    <CustomModal
      open={activeModal === global.ACTIVE_MODAL_MAP.betaAccess}
      modalTitle="Beta Access"
      modalAriaLabel="beta-access-form"
    >
      <>
        <Paragraph muted>
          Request access to the private beta of Juno. Your email needs to be a
          Google email address.
        </Paragraph>
        {DISCORD_SOCIAL_URL ? (
          <Paragraph muted>
            You can expect a reply on your request within a few hours. If you
            want to get in direct contact, use the{' '}
            <S.StyledLink href={DISCORD_SOCIAL_URL}>
              <QiLinkOut />
              <Span title="Open new tab in your browser with Discord">
                Discord Community.
              </Span>
            </S.StyledLink>
          </Paragraph>
        ) : null}
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
                {submitting ? (
                  <S.LoadingIconContainer>
                    <Span>Request access</Span>{' '}
                    <StyledCircularProgress size={20} />
                  </S.LoadingIconContainer>
                ) : (
                  'Request access'
                )}
              </S.SubmitButton>
            </>
          )}
          {complete && (
            <S.SuccessMessage>
              <FiCheck size={20} />
              <Span>You will be contacted shortly</Span>
            </S.SuccessMessage>
          )}
        </S.StyledForm>
        {error && DISCORD_SOCIAL_URL ? (
          <Span>
            Something went wrong, reach out to us on{' '}
            <a href={DISCORD_SOCIAL_URL}>Discord</a>
          </Span>
        ) : null}
      </>
    </CustomModal>
  )
}

export default BetaAccesForm
