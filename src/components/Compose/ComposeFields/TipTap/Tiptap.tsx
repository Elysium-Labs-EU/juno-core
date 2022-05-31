import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import useDebounce from '../../../../Hooks/useDebounce'
import { TrackComposeEmail } from '../../../../Store/composeSlice'
import { useAppDispatch } from '../../../../Store/hooks'
import * as local from '../../../../constants/composeEmailConstants'
import * as S from './QuillBodyStyles'
import * as Compose from '../../ComposeStyles'

const Tiptap = ({ fetchedBodyValue }: { fetchedBodyValue: string }) => {
  console.log(fetchedBodyValue)
  const [bodyValue, setBodyValue] = useState('')
  const [loadState, setLoadState] = useState('idle')
  const [isFocused, setIsFocused] = useState(false)
  const debouncedBodyValue = useDebounce(bodyValue, 500)
  const dispatch = useAppDispatch()

  const editor = useEditor({
    extensions: [StarterKit],
    content: `${fetchedBodyValue ?? ''}`,
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
    if ('') {
      const updateEventObject = { id: local.BODY, value: debouncedBodyValue }
      mounted && dispatch(TrackComposeEmail(updateEventObject))
    }
    return () => {
      mounted = false
    }
  }, [debouncedBodyValue])

  const handleBodyChange = (value: string) => {
    if (loadState === 'loading') {
      setLoadState('finished')
    }
    if (loadState === 'finished') {
      setBodyValue(value)
    }
  }

  return (
    <>
      <Compose.Label hasValue={Boolean('')}>
        <label htmlFor={local.BODY}>{local.BODY_LABEL}</label>
      </Compose.Label>
      <S.Wrapper isFocused={isFocused}>
        <EditorContent editor={editor} />
      </S.Wrapper>
    </>
  )
}

export default Tiptap
