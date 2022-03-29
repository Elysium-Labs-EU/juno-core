import styled from 'styled-components'

const StyledSnippet = styled.span`
  color: var(--color-grey-light);
  font-weight: 400;
`

const Snippet = ({ snippet }: { snippet: string }) => {
  if (snippet.length > 0)
    return <StyledSnippet>&nbsp;&nbsp;—&nbsp;&nbsp;{snippet}</StyledSnippet>
  return null
}

export default Snippet
