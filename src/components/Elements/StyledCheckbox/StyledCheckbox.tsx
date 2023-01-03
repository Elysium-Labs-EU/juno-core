import { Indicator, Root } from '@radix-ui/react-checkbox'
import styled from 'styled-components'

import { QiCheckmark } from 'images/svgIcons/quillIcons'

const StyledCheckbox = styled(Root)`
  all: unset;
  align-items: center;
  background-color: ${({ checked }) =>
    checked ? 'var(--color-black)' : 'var(--color-neutral-300)'};
  border-radius: var(--radius-m);
  display: flex;
  height: 15px;
  justify-content: center;
  margin: auto 5px;
  line-height: 1;
  min-width: 15px;
  max-width: 15px;
  transition: background-color 0.2s ease 0s;
  &:hover: {
    background-color: var(--color-neutral-300);
  }
`

const StyledIndicator = styled(Indicator)`
  color: var(--color-white);
  height: 100%;
  width: 100%;
`

const CustomCheckbox = ({
  isChecked,
  onChange,
}: {
  isChecked: boolean
  onChange: (isChecked: boolean) => void
}) => (
  <StyledCheckbox checked={isChecked} onCheckedChange={onChange}>
    <StyledIndicator>
      <QiCheckmark strokeWidth={4} size={14} />
    </StyledIndicator>
  </StyledCheckbox>
)

export default CustomCheckbox
