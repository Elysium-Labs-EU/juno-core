import * as SwitchPrimitives from '@radix-ui/react-switch'
import styled from "styled-components"

export const SwitchRoot = styled(SwitchPrimitives.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: var(--color-neutral-400);
  border-radius: 9999px;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &[data-state="checked"] {
    background-color: var(--color-purple-700);
  }
`

export const SwitchThumb = styled(SwitchPrimitives.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--color-neutral-600);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  &[data-state="checked"] {
    transform: translateX(19px);
  }
`

export const Label = styled.label`
  line-height: 1;
  padding-right: var(--spacing-2);
`

export const Flex = styled.div`
align-items: center;
  display: flex;
  gap: var(--spacing-2);
`