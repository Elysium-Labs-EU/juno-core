import { useEditor, EditorContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import useDebounce from '../../../../Hooks/useDebounce'
import { TrackComposeEmail } from '../../../../Store/composeSlice'
import { useAppDispatch } from '../../../../Store/hooks'
import * as local from '../../../../constants/composeEmailConstants'
import * as S from './TipTapBodyStyles'
import * as Compose from '../../ComposeStyles'

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        type="button"
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        type="button"
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        type="button"
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
        type="button"
      >
        code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        type="button"
      >
        clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        type="button"
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        type="button"
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        type="button"
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        type="button"
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        type="button"
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        type="button"
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        type="button"
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        type="button"
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        type="button"
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        type="button"
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
        type="button"
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
        type="button"
      >
        blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        type="button"
      >
        horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        type="button"
      >
        hard break
      </button>
      <button onClick={() => editor.chain().focus().undo().run()} type="button">
        undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} type="button">
        redo
      </button>
    </>
  )
}

const Tiptap = ({
  fetchedBodyValue,
  isReplying,
}: {
  fetchedBodyValue: string
  isReplying?: boolean
}) => {
  const [bodyValue, setBodyValue] = useState('')
  const [loadState, setLoadState] = useState('idle')
  const [isFocused, setIsFocused] = useState(false)
  const debouncedBodyValue = useDebounce(bodyValue, 500)
  const dispatch = useAppDispatch()
  const tipTapRef = useRef<any | null>(null)

  useEffect(() => {
    let mounted = true
    if (isReplying && tipTapRef.current !== null && mounted) {
      tipTapRef.current.focus()
    }
    return () => {
      mounted = false
    }
  }, [isReplying])

  console.log('here')

  const handleBodyChange = (value: string) => {
    console.log(value)
    if (loadState === 'loading') {
      setLoadState('finished')
    }
    if (loadState === 'finished') {
      setBodyValue(value)
    }
  }

  useEffect(() => {
    console.log(bodyValue)
  }, [bodyValue])

  const editorInstance = useEditor({
    extensions: [StarterKit],
    content: `${fetchedBodyValue ?? ''}`,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      // console.log(json)
      const htlmlOutput = generateHTML(json, [
        Document,
        Paragraph,
        Text,
        Bold,
        // other extensions …
      ])
      handleBodyChange(htlmlOutput)
      // send the content to an API here
    },
  })

  useEffect(() => {
    let mounted = true
    if (mounted) {
      setBodyValue(fetchedBodyValue)
      setLoadState('loading')
    }
    return () => {
      mounted = false
    }
  }, [fetchedBodyValue])

  useEffect(() => {
    let mounted = true
    if (debouncedBodyValue !== '') {
      const updateEventObject = { id: local.BODY, value: debouncedBodyValue }
      mounted && dispatch(TrackComposeEmail(updateEventObject))
    }
    return () => {
      mounted = false
    }
  }, [debouncedBodyValue])

  return (
    <>
      <Compose.Label hasValue={Boolean('')}>
        <label htmlFor={local.BODY}>{local.BODY_LABEL}</label>
      </Compose.Label>
      <S.Wrapper isFocused={isFocused}>
        <MenuBar editor={editorInstance} />
        <EditorContent editor={editorInstance} ref={tipTapRef} />
      </S.Wrapper>
    </>
  )
}

Tiptap.defaultProps = {
  isReplying: undefined,
}

export default Tiptap
