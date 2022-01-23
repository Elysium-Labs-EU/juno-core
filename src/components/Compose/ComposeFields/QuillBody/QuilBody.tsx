import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import * as S from './QuillBodyStyles'
import useDebounce from '../../../../Hooks/useDebounce'
import { TrackComposeEmail } from '../../../../Store/composeSlice'
import { useAppDispatch } from '../../../../Store/hooks'
import * as local from '../../../../constants/composeEmailConstants'
import * as Compose from '../../ComposeStyles'

const QUILL_START_STRING = '<p><br></p>'

const QuilBody = ({ fetchedBodyValue, isReplying }: any) => {
    const [bodyValue, setBodyValue] = useState('')
    const [loadState, setLoadState] = useState('idle')
    const [isFocused, setIsFocused] = useState(false)
    const debouncedBodyValue = useDebounce(bodyValue, 500)
    const dispatch = useAppDispatch()
    const quillRef = useRef<any | null>(null)

    useEffect(() => {
        if (isReplying && quillRef.current !== null) {
            quillRef.current.focus()
        }
    }, [isReplying])

    useEffect(() => {
        setBodyValue(fetchedBodyValue)
        setLoadState('loading')
    }, [fetchedBodyValue])

    useEffect(() => {
        let mounted = true
        if (debouncedBodyValue !== QUILL_START_STRING || '') {
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
            <Compose.Label hasValue={Boolean(bodyValue !== QUILL_START_STRING || '')}>
                <label htmlFor={local.BODY}>
                    {local.BODY_LABEL}
                </label>
            </Compose.Label>
            <S.Wrapper isFocused={isFocused}>
                <ReactQuill
                    theme="snow"
                    value={bodyValue}
                    onChange={handleBodyChange}
                    ref={quillRef}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                ><S.ContentArea /></ReactQuill>
            </S.Wrapper>
        </>
    )
}

export default QuilBody