import { useAppDispatch } from '../../../store/hooks'
import { setInSearch } from '../../../store/utilsSlice'
import * as S from './ListItemStyles'

const ListItem = ({
  closeOnSelect = true,
  item: { onClick, icon, children },
  focusedItemIndex,
  index,
}: {
  closeOnSelect?: boolean
  item: any
  focusedItemIndex: number
  index: number
}) => {
  const dispatch = useAppDispatch()

  const clickAndClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onClick) {
      onClick(e)

      if (closeOnSelect) {
        dispatch(setInSearch(false))
      }
    }
  }

  return (
    <S.ListItem
      isFocused={index === focusedItemIndex}
      onClick={clickAndClose}
      // The className is used to target it.
      className="command-palette-list-item"
    >
      <S.IconTitleContainer>
        {icon && <S.IconContainer>{icon}</S.IconContainer>}
        <p>{children}</p>
      </S.IconTitleContainer>
    </S.ListItem>
  )
}

export default ListItem
