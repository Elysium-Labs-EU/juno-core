import { cloneElement } from 'react'
import toast from 'react-hot-toast'

import * as S from './ToastStyles'
import type { TToast } from './ToastTypes'

const CustomToast = ({
  button,
  description,
  specificToast,
  title,
  variant = 'info',
}: TToast) => {
  const showDescription = description ? 'true' : 'false'
  return (
    <S.ToastRoot showdescription={showDescription}>
      {title ? (
        <S.ToastTitle showdescription={showDescription} variant={variant}>
          {title}
        </S.ToastTitle>
      ) : null}
      {description ? (
        <S.ToastDescription>{description}</S.ToastDescription>
      ) : null}
      {button ? (
        <S.ToastAction>
          {cloneElement(button, {
            onClick: () => {
              if (button.type === 'button') {
                // Here we reset the type of the button so we can narrow the type down.
                const buttonReset: unknown = button
                if (
                  buttonReset instanceof Object &&
                  'props' in buttonReset &&
                  buttonReset.props instanceof Object &&
                  'onClick' in buttonReset.props
                ) {
                  if (typeof buttonReset.props.onClick === 'function') {
                    buttonReset.props.onClick()
                  }
                }
              }
              toast.dismiss(specificToast.id)
            },
          })}
        </S.ToastAction>
      ) : null}
    </S.ToastRoot>
  )
}

export default CustomToast
