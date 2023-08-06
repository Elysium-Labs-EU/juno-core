import BlockQuote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, generateHTML, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from 'dompurify'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import CustomToast from 'components/Elements/Toast/Toast'
import * as global from 'constants/globalConstants'
import settingsApi from 'data/settingsApi'
import useDebounce from 'hooks/useDebounce'
import { selectProfile, setProfile } from 'store/baseSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import * as S from './SignatureStyles'

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
      const json = editor.getJSON()
      const htlmlOutput = generateHTML(json, [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Heading,
        BlockQuote,
        HardBreak,
        BulletList,
        OrderedList,
        ListItem,
      ])
      handleBodyChange(htlmlOutput)
    },
  })

  useEffect(() => {
    const updateSignature = async () => {
      const request = { signature: debouncedValue }
      if (profile.emailAddress) {
        try {
          const response = await settingsApi().updateSendAs(
            profile.emailAddress,
            request
          )
          if (!('data' in response)) {
            toast.custom((t) => (
              <CustomToast
                specificToast={t}
                title="Cannot update signature."
                variant="error"
              />
            ))

            return
          }
          dispatch(
            setProfile({ ...profile, signature: response.data.signature })
          )
        } catch (err) {
          toast.custom((t) => (
            <CustomToast
              specificToast={t}
              title="Cannot update signature."
              variant="error"
            />
          ))
        }
      } else {
        toast.custom((t) => (
          <CustomToast
            specificToast={t}
            title="Cannot update signature."
            variant="error"
          />
        ))
      }
    }
    if (
      debouncedValue !== profile.signature &&
      loadState === global.LOAD_STATE_MAP.loaded
    ) {
      updateSignature()
    }
  }, [debouncedValue, profile.signature])

  // Load the state from Redux into the editor.
  useEffect(() => {
    // Only set the load state to loading if the state was idle
    if (loadState === global.LOAD_STATE_MAP.idle) {
      setLoadState(global.LOAD_STATE_MAP.loading)
    }
    if (
      typeof profile.signature === 'string' &&
      value.length < 1 &&
      editorInstance
    ) {
      setValue(profile.signature)
      editorInstance.commands.setContent(profile.signature)
      setLoadState(global.LOAD_STATE_MAP.loaded)
    }
  }, [profile.signature, editorInstance])

  return (
    <div>
      {TITLE}
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
