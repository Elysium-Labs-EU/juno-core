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
import type { FocusPosition } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import type { assertComposerMode } from 'components/Compose/Composer'
import * as Compose from 'components/Compose/ComposeStyles'
import * as local from 'constants/composeEmailConstants'
import * as global from 'constants/globalConstants'
import useDebounce from 'hooks/useDebounce'
import isEqual from 'utils/isEqual/isEqual'
import removeSignature from 'utils/removeSignature'
import stringSimilarity from 'utils/stringSimilarity'

import MenuBar from './BodyFieldMenubar'
import * as S from './BodyFieldStyles'

/**
 * @param composeValue - the body value fetched from an external source.
 * @param autofocus set the modal to focus on load
 * @param updateComposeEmail - a callback function that sends back the  body value to the parent component
 * @returns {JSX.Element}
 */

interface BodyFieldProps {
  autofocus?: FocusPosition
  composeValue?: string
  composerMode: ReturnType<typeof assertComposerMode>
  hasInteracted: boolean
  loadState: string
  setHasInteracted: Dispatch<SetStateAction<boolean>>
  updateComposeEmail: (object: { id: string; value: string }) => void
}

const BodyField = ({
  autofocus = false,
  composerMode,
  composeValue = undefined,
  hasInteracted,
  loadState,
  setHasInteracted,
  updateComposeEmail,
}: BodyFieldProps) => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const debouncedValue = useDebounce(value, 500)

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
      setValue(
        DOMPurify.sanitize(htlmlOutput, {
          USE_PROFILES: { html: true },
        })
      )
    },
    onFocus() {
      setIsFocused(true)
    },
    onBlur() {
      setIsFocused(false)
    },
  })

  useEffect(() => {
    if (composeValue && composeValue.length > 0 && editorInstance) {
      if (composeValue.includes(global.JUNO_SIGNATURE)) {
        const response = removeSignature(composeValue)

        // Compare the input fetched body value and the stored body value - if below a certain treshhold, overwrite the local state.
        if (stringSimilarity(composeValue, value) < 0.9) {
          editorInstance.commands.setContent(response.outerHTML, true)
        }
      } else {
        editorInstance.commands.setContent(composeValue, true)
      }
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
        {/* The value will be set to a minimal length of 7 by the instantiated paragraph tags */}
        <Compose.Label hasValue={value.length > 7}>
          <label htmlFor={local.BODY}>{local.BODY_LABEL}</label>
        </Compose.Label>
        <S.Wrapper isFocused={isFocused} data-cy="body-field">
          <S.MenuBar isFocused={isFocused}>
            <MenuBar editor={editorInstance} />
          </S.MenuBar>
          <EditorContent
            editor={editorInstance}
            onKeyDown={() => {
              if (!hasInteracted) {
                setHasInteracted(true)
              }
            }}
            onFocus={() => {
              if (!hasInteracted && composerMode === 'forwarding') {
                editorInstance?.commands.focus('start')
                return
              }
              if (!hasInteracted && composerMode !== 'forwarding') {
                editorInstance?.commands.focus('end')
              }
            }}
          />
        </S.Wrapper>
      </>
    ),
    [composerMode, editorInstance, hasInteracted, isFocused, value]
  )

  return memoizedBodyField
}

export default BodyField
