import { useCallback } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { setShowIntroduction, setShowKeyboardCombos } from '../../store/utilsSlice'
import { modifierKeyDisplay } from '../../utils/setModifierKey'
import * as S from './HelpStyles'

const MenuSection = ({
  menuItems,
}: {
  menuItems: { title: string; onClick: () => void; hint?: string[] }[][]
}) => (
  // eslint-disable-next-line react/no-array-index-key
  <>{menuItems.map((section, index) => <S.MenuSection key={index}>
    {section.map((item) => (
      <S.MenuItem key={item.title} onClick={() => item.onClick()}>
        <S.MenuItemContentMain>{item.title}</S.MenuItemContentMain>{item?.hint && <S.MenuItemContentSide>{item.hint.map((it) => <span key={it}>{it}</span>)}</S.MenuItemContentSide>}
      </S.MenuItem>
    ))}
  </S.MenuSection>)}</>
)

const HelpMenu = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}) => {
  const dispatch = useAppDispatch()
  const MENU_ITEMS_HELP = [
    {
      title: 'Keyboard shortcuts',
      onClick: () => dispatch(setShowKeyboardCombos(true)),
      hint: [modifierKeyDisplay, '/'],
    },
    {
      title: 'Introduction',
      onClick: () => dispatch(setShowIntroduction(true)),
    },
  ]
  const MENU_ITEMS_FEEDBACK = [
    {
      title: 'Send feedback',
      onClick: () => dispatch(setShowIntroduction(true)),
      hint: [modifierKeyDisplay, '.'],
    },
  ]

  const handleEvent = useCallback(() => {
    dispatch(setShowKeyboardCombos(true))
  }, [dispatch])

  return (
    <S.Layer id="HEY THERE">
      <S.InnerLayer>
        <S.Container>
          <MenuSection menuItems={[MENU_ITEMS_HELP, MENU_ITEMS_FEEDBACK]} />
        </S.Container>
      </S.InnerLayer>
    </S.Layer>
  )
}

export default HelpMenu
