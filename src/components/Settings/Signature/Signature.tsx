import DOMPurify from 'dompurify'
import { useCallback, useEffect, useState } from 'react'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import * as global from '../../../constants/globalConstants'
import settingsApi from '../../../data/settingsApi'
import useDebounce from '../../../hooks/useDebounce'
import { selectProfile, setProfile } from '../../../store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setSystemStatusUpdate } from '../../../store/utilsSlice'
import StyledCircularProgress from '../../Elements/StyledCircularProgress'
import * as S from './SignatureStyles'
import sanitizeAndParseHtmlContent from '../../../utils/sanitizeAndParseHtmlContent'

const TITLE = 'Signature'

const Signature = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)

  const handleBodyChange = useCallback((incomingValue: string) => {
    setValue(
      DOMPurify.sanitize(incomingValue, {
        USE_PROFILES: { html: true },
      })
    )
  }, [])

  const editorInstance = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const textContent = editor.getText()
      handleBodyChange(textContent)
    },
  })

  useEffect(() => {
    const updateSignature = async () => {
      const request = { signature: debouncedValue }
      try {
        const response = await settingsApi().updateSendAs(
          profile.emailAddress,
          request
        )
        if (response?.status !== 200) {
          dispatch(
            setSystemStatusUpdate({
              type: 'error',
              message: 'Cannot update signature.',
            })
          )
          return
        }
        dispatch(
          setProfile({ ...profile, signature: response?.data?.signature })
        )
      } catch (err) {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: 'Cannot update signature.',
          })
        )
      }
    }
    if (
      debouncedValue !== profile?.signature &&
      loadState === global.LOAD_STATE_MAP.loaded
    ) {
      updateSignature()
    }
  }, [debouncedValue, profile?.signature])

  // Load the state from Redux into the editor.
  useEffect(() => {
    // Only set the load state to loading if the state was idle
    if (loadState === global.LOAD_STATE_MAP.idle) {
      setLoadState(global.LOAD_STATE_MAP.loading)
    }
    if (
      typeof profile?.signature === 'string' &&
      value.length < 1 &&
      editorInstance
    ) {
      setValue(profile?.signature)
      editorInstance.commands.setContent({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: profile?.signature,
              },
            ],
          },
        ],
      })
      setLoadState(global.LOAD_STATE_MAP.loaded)
    }
  }, [profile?.signature, editorInstance])

  return (
    <div>
      {TITLE}
      {sanitizeAndParseHtmlContent(value)}
      <S.EditorWrapper>
        {loadState === global.LOAD_STATE_MAP.loaded && (
          <EditorContent editor={editorInstance} />
        )}
        {loadState === global.LOAD_STATE_MAP.loading && (
          <S.LoadingContainer>
            <StyledCircularProgress />
          </S.LoadingContainer>
        )}
      </S.EditorWrapper>
    </div>
  )
}

export default Signature
