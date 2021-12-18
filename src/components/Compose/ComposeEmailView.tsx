import React from 'react'
import InputBase from '@mui/material/InputBase'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { CustomButtonText } from '../Elements/Buttons'
import emailValidation from '../../utils/emailValidation'
import * as S from './ComposeStyles'
import * as local from '../../constants/composeEmailConstants'
import { useAppDispatch } from '../../Store/hooks'
import { SendComposedEmail } from '../../Store/composeSlice'
import { listRemoveDraft, resetDraftDetails } from '../../Store/draftsSlice'
import EmailInput from './ComposeFields/EmailInput'

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
]

interface IComposeEmailView {
    bccValue: string[]
    bodyValue: string
    ccValue: string[]
    draftDetails: any
    handleChange: any
    handleDelete: Function
    inputToValue: any
    inputCCValue: any
    inputBCCValue: any
    isReplying: boolean
    isReplyingListener: Function
    saveSuccess: boolean
    setToError: Function
    setShowCC: Function
    setShowBCC: Function
    showBCC: boolean
    showCC: boolean
    setInputToValue: Function
    setInputCCValue: Function
    setInputBCCValue: Function
    subjectValue: string
    toError: boolean
    toValue: string[]
}

const ComposeEmailView = (props: IComposeEmailView) => {
    const {
        bccValue,
        bodyValue,
        ccValue,
        draftDetails,
        handleChange,
        handleDelete,
        inputToValue,
        inputCCValue,
        inputBCCValue,
        isReplying,
        isReplyingListener,
        saveSuccess,
        setToError,
        showBCC,
        showCC,
        setInputToValue,
        setInputCCValue,
        setInputBCCValue,
        setShowBCC,
        setShowCC,
        subjectValue,
        toError,
        toValue
    } = props
    const dispatch = useAppDispatch()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (toValue.length > 0) {
            if (emailValidation(toValue)) {
                dispatch(SendComposedEmail())
                dispatch(resetDraftDetails())
                dispatch(listRemoveDraft({ threadId: draftDetails.message.threadId }))
            } else {
                setToError(true)
            }
        }
    }

    return (
        <S.Wrapper isReplying={isReplying}>
            <S.UpdateContainer>
                {saveSuccess && <span className="text_muted">{local.DRAFT_SAVED}</span>}
            </S.UpdateContainer>
            <S.ComposerContainer className="composer composerIsVisible">
                <div className="base">
                    <form onSubmit={onSubmit} autoComplete="off">
                        <div style={{ marginBottom: `7px` }}>
                            <div className="base">
                                <S.Row>
                                    <S.Label hasValue={toValue && toValue.length > 0}>
                                        <label htmlFor={local.TO}>
                                            {local.TO_LABEL}
                                        </label>
                                    </S.Label>
                                    <FormControl error={toError} fullWidth>
                                        <EmailInput
                                            id={local.TO}
                                            valueState={toValue}
                                            availableOptions={top100Films}
                                            handleChange={handleChange}
                                            inputValue={inputToValue}
                                            setInputValue={setInputToValue}
                                            handleDelete={handleDelete}
                                            willAutoFocus={!isReplying}
                                        />
                                        {toError && (
                                            <FormHelperText id="component-helper-text">
                                                {local.EMAIL_WARNING}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <S.CcBccContainer>
                                        {!showCC && <CustomButtonText label="CC" className="button option-link" onClick={() => setShowCC(true)} />}
                                        {!showBCC && <CustomButtonText label="BCC" className="button option-link" onClick={() => setShowBCC(true)} />}
                                    </S.CcBccContainer>
                                </S.Row>
                                {showCC && <S.Row>
                                    <S.Label hasValue={ccValue && ccValue.length > 0}>
                                        <label htmlFor={local.CC}>
                                            {local.CC_LABEL}
                                        </label>
                                    </S.Label>
                                    <FormControl error={toError} fullWidth>
                                        <EmailInput
                                            id={local.CC}
                                            valueState={ccValue}
                                            availableOptions={top100Films}
                                            handleChange={handleChange}
                                            inputValue={inputCCValue}
                                            setInputValue={setInputCCValue}
                                            handleDelete={handleDelete}
                                            willAutoFocus={showCC}
                                        />
                                        {toError && (
                                            <FormHelperText id="component-helper-text">
                                                {local.EMAIL_WARNING}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </S.Row>}
                                {showBCC && <S.Row>
                                    <S.Label hasValue={bccValue && bccValue.length > 0}>
                                        <label htmlFor={local.BCC}>
                                            {local.BCC_LABEL}
                                        </label>
                                    </S.Label>
                                    <FormControl error={toError} fullWidth>
                                        <EmailInput
                                            id={local.BCC}
                                            valueState={bccValue}
                                            availableOptions={top100Films}
                                            handleChange={handleChange}
                                            inputValue={inputBCCValue}
                                            setInputValue={setInputBCCValue}
                                            handleDelete={handleDelete}
                                            willAutoFocus={showBCC}
                                        />
                                        {toError && (
                                            <FormHelperText id="component-helper-text">
                                                {local.EMAIL_WARNING}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </S.Row>}
                                <S.Row>
                                    <S.Label hasValue={Boolean(subjectValue)}>
                                        <label htmlFor={local.SUBJECT}>
                                            {local.SUBJECT_LABEL}
                                        </label>
                                    </S.Label>
                                    <InputBase
                                        id={local.SUBJECT}
                                        value={subjectValue ?? ''}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </S.Row>
                                <S.Row>
                                    <S.Label hasValue={Boolean(bodyValue)}>
                                        <label htmlFor={local.BODY}>
                                            {local.BODY_LABEL}
                                        </label>
                                    </S.Label>
                                    <InputBase
                                        id={local.BODY}
                                        multiline
                                        value={bodyValue ?? ''}
                                        onChange={handleChange}
                                        minRows={12}
                                        maxRows={25}
                                        fullWidth
                                        autoFocus={isReplying}
                                    />
                                </S.Row>
                            </div>
                        </div>
                        <CustomButtonText
                            type="submit"
                            className="button button-small button-light"
                            label={local.SEND_BUTTON}
                            disabled={!toValue}
                        />
                        {isReplying && (
                            <CustomButtonText
                                className="button button-small"
                                label={local.CANCEL_BUTTON}
                                onClick={() => isReplyingListener(-1)}
                            />
                        )}
                    </form>
                </div>
            </S.ComposerContainer>
        </S.Wrapper>
    )
}


export default ComposeEmailView
