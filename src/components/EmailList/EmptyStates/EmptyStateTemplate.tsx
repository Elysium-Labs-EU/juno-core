import styled from 'styled-components'

import { Paragraph } from 'styles/globalStyles'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
`

const SVGWrapper = styled.div`
  min-width: 200px;
  width: 100vw;
  max-width: 400px;
  height: auto;
`

interface IEmptyStateTemplate {
  header: string
  paragraph: string
  SVG: JSX.Element
}

const EmptyStateTemplate = ({
  header,
  paragraph,
  SVG,
}: IEmptyStateTemplate) => (
  <Wrapper>
    <SVGWrapper>{SVG}</SVGWrapper>
    <p>{header}</p>
    <Paragraph muted style={{ marginTop: 0 }}>
      {paragraph}
    </Paragraph>
  </Wrapper>
)

export default EmptyStateTemplate
