import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import * as S from '../ComposeStyles'
import * as local from '../../../constants/composeEmailConstants'
import EmailInput from './EmailInput'

const RecipientField = (props: any) => {
    const { recipientFieldValue, fieldId, fieldLabel, toError, handleChangeRecipients, inputValue, setInputValue, handleDelete, showField } = props

    return (
        <>
            <S.Label hasValue={recipientFieldValue && Object.keys(recipientFieldValue).length > 0}>
                <label htmlFor={fieldId}>
                    {fieldLabel}
                </label>
            </S.Label>
            <FormControl error={toError} fullWidth>
                <EmailInput
                    id={fieldId}
                    valueState={recipientFieldValue}
                    handleChange={handleChangeRecipients}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleDelete={handleDelete}
                    willAutoFocus={showField}
                />
                {toError && (
                    <FormHelperText id="component-helper-text">
                        {local.EMAIL_WARNING}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    )
}

export default RecipientField