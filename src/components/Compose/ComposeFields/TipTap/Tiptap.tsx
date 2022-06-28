import { useEditor, EditorContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react'
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
import useDebounce from '../../../../Hooks/useDebounce'
import { trackComposeEmail } from '../../../../Store/composeSlice'
import { useAppDispatch } from '../../../../Store/hooks'
import * as local from '../../../../constants/composeEmailConstants'
import * as S from './TipTapBodyStyles'
import * as Compose from '../../ComposeStyles'
import MenuBar from './TipTapMenubar'

const Tiptap = ({
  fetchedBodyValue,
  isReplying,
}: {
  fetchedBodyValue: string
  isReplying?: boolean
}) => {
  const [bodyValue, setBodyValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const debouncedBodyValue = useDebounce(bodyValue, 500)
  const dispatch = useAppDispatch()
  const tipTapRef = useRef<any | null>(null)

  const handleBodyChange = (value: string) => {
    setBodyValue(
      DOMPurify.sanitize(value, {
        USE_PROFILES: { html: true },
      })
    )
  }

  const editorInstance = useEditor({
    extensions: [StarterKit],
    autofocus: isReplying ?? false,
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
    onFocus() {
      setIsFocused(true)
    },
    onBlur() {
      setIsFocused(false)
    },
  })

  useEffect(() => {
    let mounted = true
    if (mounted && fetchedBodyValue && fetchedBodyValue.length > 0) {
      setBodyValue(fetchedBodyValue)
      if (bodyValue.length < 1 && editorInstance) {
        editorInstance.commands.setContent(fetchedBodyValue)
      }
    }
    return () => {
      mounted = false
    }
  }, [fetchedBodyValue])

  useEffect(() => {
    let mounted = true
    if (debouncedBodyValue !== '') {
      const updateEventObject = { id: local.BODY, value: debouncedBodyValue }
      mounted && dispatch(trackComposeEmail(updateEventObject))
    }
    return () => {
      mounted = false
    }
  }, [debouncedBodyValue])

  return (
    <>
      <Compose.Label hasValue={Boolean(bodyValue)}>
        <label htmlFor={local.BODY}>{local.BODY_LABEL}</label>
      </Compose.Label>
      <S.Wrapper isFocused={isFocused}>
        <S.MenuBar isFocused={isFocused}>
          <MenuBar editor={editorInstance} />
        </S.MenuBar>
        <EditorContent editor={editorInstance} ref={tipTapRef} />
      </S.Wrapper>
    </>
  )
}

Tiptap.defaultProps = {
  isReplying: undefined,
}

export default Tiptap
