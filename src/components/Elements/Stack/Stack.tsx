/* eslint-disable react/jsx-props-no-spreading */
import type { ElementType } from 'react'

import * as S from './StackStyles'
import type { TStackProps } from './StackTypes'

const Stack = <T extends ElementType = 'div'>({
  align = 'stretch',
  children,
  direction = 'horizontal',
  justify = 'stretch',
  renderAs,
  spacing = 'default',
  wrap = 'false',
  ...rest
}: TStackProps<T>) => (
  <S.Stack
    as={renderAs}
    align={align}
    direction={direction}
    justify={justify}
    spacing={spacing}
    wrap={wrap}
    {...rest}
  >
    {children}
  </S.Stack>
)

export default Stack
