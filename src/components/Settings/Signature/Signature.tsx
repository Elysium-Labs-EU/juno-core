import { useEditor, EditorContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCallback, useEffect, useState } from 'react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BlockQuote from '@tiptap/extension-blockquote'
import HardBreak from '@tiptap/extension-hard-break'
import Italic from '@tiptap/extension-italic'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import DOMPurify from 'dompurify'
import * as S from './SignatureStyles'
import settingsApi from '../../../data/settingsApi'
import { selectProfile, setProfile } from '../../../store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import useDebounce from '../../../hooks/useDebounce'
import { setServiceUnavailable } from '../../../store/utilsSlice'
import * as global from '../../../constants/globalConstants'
import StyledCircularProgress from '../../Elements/StyledCircularProgress'

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
      try {
        const response = await settingsApi().updateSendAs(
          profile.emailAddress,
          request
        )
        if (response?.status !== 200) {
          dispatch(setServiceUnavailable('Cannot update signature'))
          return
        }
        dispatch(
          setProfile({ ...profile, signature: response?.data?.signature })
        )
      } catch (err) {
        dispatch(setServiceUnavailable('Cannot update signature'))
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
      editorInstance.commands.setContent(profile?.signature)
      setLoadState(global.LOAD_STATE_MAP.loaded)
    }
  }, [profile?.signature, editorInstance])

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
