import DOMPurify from 'dompurify'
import { isEqual } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { compareTwoStrings } from 'string-similarity'

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

import * as local from '../../../../constants/composeEmailConstants'
import * as global from '../../../../constants/globalConstants'
import useDebounce from '../../../../hooks/useDebounce'
import removeSignature from '../../../../utils/removeSignature'
import * as Compose from '../../ComposeStyles'
import MenuBar from './BodyFieldMenubar'
import * as S from './BodyFieldStyles'

/**
 * @param composeValue - the body value fetched from an external source.
 * @param autofocus set the modal to focus on load
 * @param updateComposeEmail - a callback function that sends back the  body value to the parent component
 * @returns {JSX.Element}
 */

const BodyField = ({
  composeValue = undefined,
  autofocus = false,
  updateComposeEmail,
  loadState,
}: {
  composeValue?: string
  autofocus?: boolean
  updateComposeEmail: (object: { id: string; value: string }) => void
  loadState: string
}) => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const debouncedValue = useDebounce(value, 500)
  const tipTapRef = useRef<any | null>(null)

  const handleChange = useCallback((incomingValue: string) => {
    setValue(
      DOMPurify.sanitize(incomingValue, {
        USE_PROFILES: { html: true },
      })
    )
  }, [])

  const editorInstance = useEditor({
    extensions: [StarterKit],
    autofocus,
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
      handleChange(htlmlOutput)
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
    if (mounted && composeValue && composeValue.length > 0) {
      if (composeValue.includes(global.JUNO_SIGNATURE)) {
        const response = removeSignature(composeValue)
        setValue(response.outerHTML)

        // Compare the input fetched body value and the stored body value - if below a certain treshhold, overwrite the local state.
        if (compareTwoStrings(composeValue, value) < 0.9 && editorInstance) {
          editorInstance.commands.setContent(response.outerHTML)
        }
      } else {
        setValue(composeValue)
        if (value.length < 1 && editorInstance) {
          editorInstance.commands.setContent(composeValue)
        }
      }
    }
    return () => {
      mounted = false
    }
  }, [composeValue, editorInstance])

  useEffect(() => {
    if (
      debouncedValue &&
      loadState === global.LOAD_STATE_MAP.loaded &&
      !isEqual(composeValue, debouncedValue)
    ) {
      const updateEventObject = { id: local.BODY, value: debouncedValue }
      updateComposeEmail(updateEventObject)
    }
  }, [debouncedValue, loadState])

  const memoizedBodyField = useMemo(
    () => (
      <>
        <Compose.Label hasValue={Boolean(value)}>
          <label htmlFor={local.BODY}>{local.BODY_LABEL}</label>
        </Compose.Label>
        <S.Wrapper isFocused={isFocused}>
          <S.MenuBar isFocused={isFocused}>
            <MenuBar editor={editorInstance} />
          </S.MenuBar>
          <EditorContent editor={editorInstance} ref={tipTapRef} />
        </S.Wrapper>
      </>
    ),
    [value, isFocused, editorInstance, tipTapRef]
  )

  return memoizedBodyField
}

export default BodyField
