import {
  MdFormatBold,
  MdFormatClear,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdOutlineRedo,
  MdOutlineUndo,
} from 'react-icons/md'

import * as S from './BodyFieldStyles'

const PARAGRAPH = 'paragraph'
const H1 = 'h1'
const H2 = 'h2'
const H3 = 'h3'
const H4 = 'h4'
const HARD_BREAK = 'hard break'

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <S.Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        type="button"
        title="bold"
      >
        <MdFormatBold />
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        type="button"
        title="italic"
      >
        <MdFormatItalic />
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        type="button"
        title="Clear fomatting"
      >
        <MdFormatClear />
      </S.Button>

      <S.Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        type="button"
        title="Paragraph"
      >
        {PARAGRAPH}
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        type="button"
        title="Header"
      >
        {H1}
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        type="button"
        title="Header"
      >
        {H2}
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        type="button"
        title="Header"
      >
        {H3}
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        type="button"
        title="Header"
      >
        {H4}
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        type="button"
        title="Bullet list"
      >
        <MdFormatListBulleted />
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        type="button"
        title="Numbered list"
      >
        <MdFormatListNumbered />
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
        type="button"
        title="Quote"
      >
        <MdFormatQuote />
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        type="button"
      >
        {HARD_BREAK}
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().undo().run()}
        type="button"
        title="undo"
      >
        <MdOutlineUndo />
      </S.Button>
      <S.Button
        onClick={() => editor.chain().focus().redo().run()}
        type="button"
        title="redo"
      >
        <MdOutlineRedo />
      </S.Button>
    </>
  )
}

export default MenuBar
