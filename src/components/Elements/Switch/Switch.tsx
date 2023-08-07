import type * as SwitchPrimitives from '@radix-ui/react-switch'
import type { ReactNode } from 'react'

import * as S from './SwitchStyles'

export interface SwitchProps extends SwitchPrimitives.SwitchProps {
    labelposition?: 'left' | 'right'
    children?: ReactNode
    id: string
}

export default function Switch({ checked = false, children, disabled, id, labelposition = 'right', onCheckedChange, ...rest }: SwitchProps) {
    const switchLabel = <S.Label htmlFor={id}>
        {children}
    </S.Label>
    return (
        <S.Flex>
            {labelposition === 'left' && switchLabel}
            <S.SwitchRoot id={id}
                disabled={disabled}
                checked={checked}
                onCheckedChange={onCheckedChange}
                {...rest}>
                <S.SwitchThumb />
            </S.SwitchRoot>
            {labelposition === 'right' && switchLabel}
        </S.Flex>
    )
}
