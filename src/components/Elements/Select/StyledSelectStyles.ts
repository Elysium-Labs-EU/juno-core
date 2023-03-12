import * as SelectPrimitive from '@radix-ui/react-select'
import styled from 'styled-components'

export const StyledTrigger = styled(SelectPrimitive.SelectTrigger)`
  all: unset;
  align-items: center;
  background-color: var(--color-white);
  border-radius: var(--radius-m);
  box-shadow: var(--box-shadow-low);
  display: inline-flex;
  gap: var(--gap-spacing-1);
  height: 35px;
  justify-content: center;
  line-height: 1;
  padding: 0 var(--spacing-2);
  min-width: 150px;
  max-width: max-content;

  &:hover: {
    background-color: var(--color-neutral-300);
  }
  &:focus: {
    box-shadow: 0 0 0 2px black;
  }
  &[data-placeholder] {
    color: var(--color-neutral-700);
  }
`

export const StyledIcon = styled(SelectPrimitive.SelectIcon)`
  color: var(--color-purple-500);
`

export const StyledContent = styled(SelectPrimitive.Content)`
  background-color: var(--color-white);
  border-radius: var(--radius-l);
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  overflow: hidden;
  position: relative;
  z-index: calc(var(--z-index-modal) + 1);
`

export const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 5px;
`

export const StyledItem = styled(SelectPrimitive.Item)`
  all: unset;
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
  line-height: 25px;
  color: var(--color-neutral-500);
`
export const StyledSeparator = styled(SelectPrimitive.Separator)`
  height: 1px;
  background-color: var(--color-neutral-300);
  margin: 5;
`

export const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  align-items: center;
  display: inline-flex;
  justify-content: center;
  left: 0;
  position: absolute;
  width: 25px;
`

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  cursor: 'default',
}

export const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
  ${scrollButtonStyles}
`

export const StyledScrollDownButton = styled(SelectPrimitive.ScrollUpButton)`
  ${scrollButtonStyles}
`
