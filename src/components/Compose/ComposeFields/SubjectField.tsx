import { isEqual } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import * as local from '../../../constants/composeEmailConstants'
import * as global from '../../../constants/globalConstants'
import useDebounce from '../../../hooks/useDebounce'
import * as S from '../ComposeStyles'
import StyledTextField from './Generic/EmailInput/EmailInputStyles'

const SubjectField = ({
  composeValue = undefined,
  updateComposeEmail,
  loadState,
}: {
  composeValue?: string
  updateComposeEmail: (object: { id: string; value: string }) => void
  loadState: string
}) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  // Listens to the parent component changes, and updates the internal state in case there is preloaded data.
  useEffect(() => {
    if (
      loadState === global.LOAD_STATE_MAP.loaded &&
      composeValue &&
      !isEqual(composeValue, value)
    ) {
      setValue(composeValue)
    }
  }, [composeValue, loadState])

  useEffect(() => {
    if (
      debouncedValue &&
      loadState === global.LOAD_STATE_MAP.loaded &&
      !isEqual(composeValue, debouncedValue)
    ) {
      const updateEventObject = {
        id: local.SUBJECT,
        value: debouncedValue,
      }
      updateComposeEmail(updateEventObject)
    }
  }, [debouncedValue, loadState])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const memoizedSubjectField = useMemo(
    () => (
      <>
        <S.Label hasValue={Boolean(value)}>
          <label htmlFor={local.SUBJECT}>{local.SUBJECT_LABEL}</label>
        </S.Label>
        <StyledTextField
          id={local.SUBJECT}
          value={value ?? ''}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
      </>
    ),
    [value, handleChange]
  )
  return memoizedSubjectField
}

export default SubjectField
