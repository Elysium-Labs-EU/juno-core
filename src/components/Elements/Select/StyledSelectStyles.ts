import styled from 'styled-components'
import * as SelectPrimitive from '@radix-ui/react-select'

export const StyledTrigger = styled(SelectPrimitive.SelectTrigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-m);
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: var(--color-white);
  box-shadow: var(--box-shadow-low);
  /* color: violet.violet11 */
  &:hover: {
    background-color: var(--color-neutral-300);
  }
  &:focus: {
    box-shadow: 0 0 0 2px black;
  }
  /* '&[data-placeholder]': { color: violet.violet9 },; */
`

export const StyledIcon = styled(SelectPrimitive.SelectIcon)`
  color: var(--color-purple-500);
`

export const StyledContent = styled(SelectPrimitive.Content)`
  overflow: hidden;
  position: relative;
  z-index: calc(var(--z-index-modal) + 1);
  background-color: var(--color-white);
  border-radius: var(--radius-l);
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`

export const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 5px;
`

export const StyledItem = styled(SelectPrimitive.Item)`
  all: unset;
  font-size: 13px;
  line-height: 1;
  border-radius: var(--radius-s);
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;

  &[data-disabled] {
    color: var(--color-neutral-300);
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`

export const StyledLabel = styled(SelectPrimitive.Label)`
  padding: 0 25px;
  font-size: 12px;
  line-height: 25px;
  /* color: mauve.mauve11, */
`
export const StyledSeparator = styled(SelectPrimitive.Separator)`
  height: 1px;
  background-color: var(--color-neutral-300);
  margin: 5;
`

export const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  //   color: violet.violet11,
  cursor: 'default',
}

export const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
  ${scrollButtonStyles}
`

export const StyledScrollDownButton = styled(SelectPrimitive.ScrollUpButton)`
  ${scrollButtonStyles}
`
