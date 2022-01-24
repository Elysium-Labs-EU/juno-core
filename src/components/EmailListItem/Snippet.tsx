import styled from 'styled-components'
import * as theme from '../../constants/themeConstants'

const StyledSnippet = styled.span`
  color: ${theme.colorLightGrey};
  font-weight: 400;
`

const Snippet = ({ snippet }: { snippet: string }) => {
  if (snippet.length > 0)
    return <StyledSnippet>&nbsp;&nbsp;—&nbsp;&nbsp;{snippet}</StyledSnippet>
  return null
}

export default Snippet
