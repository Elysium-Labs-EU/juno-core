import DOMPurify from 'dompurify'
import styled from 'styled-components'
import convertStringToHTML from '../../utils/convertStringToHTML'

const StyledSnippet = styled.span`
  color: var(--color-grey-light);
  font-weight: 400;
`

const Snippet = ({ snippet }: { snippet: string }) => {
  if (snippet.length > 0)
    return (
      <StyledSnippet data-testid="email-snippet">
        &nbsp;&nbsp;—&nbsp;&nbsp;
        {DOMPurify.sanitize(convertStringToHTML(snippet)?.innerText, {
          USE_PROFILES: { html: true },
        })}
      </StyledSnippet>
    )
  return <div data-testid="email-snippet" />
}

export default Snippet
