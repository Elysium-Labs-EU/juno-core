import type { ElementType, ReactNode } from 'react'

export type TStackSpacing =
  | 'none'
  | 'px'
  | 'mini'
  | 'small'
  | 'default'
  | 'large'
  | 'huge'

export type TStackAlignment =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'space-between'

export type TStackProps<T extends ElementType> = {
  align?: TStackAlignment
  children: ReactNode
  direction?: 'vertical' | 'horizontal'
  justify?: TStackAlignment
  renderAs?: keyof JSX.IntrinsicElements
  spacing?: TStackSpacing
  wrap?: 'false' | 'true'
} & React.ComponentPropsWithoutRef<T>

export type TStackStyledProps = {
  align: TStackAlignment
  direction: 'vertical' | 'horizontal'
  justify: TStackAlignment
  spacing: TStackSpacing
  wrap: 'false' | 'true'
}
