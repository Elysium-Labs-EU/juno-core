import { forwardRef } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { setActiveModal } from '../../store/utilsSlice'
import { modifierKeyDisplay } from '../../utils/setModifierKey'
import * as S from './HelpStyles'
import * as global from '../../constants/globalConstants'

const MenuSection = ({
  menuItems,
}: {
  menuItems: { title: string; onClick: () => void; hint?: string[] }[][]
}) => (
  <>
    {menuItems.map((section, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <S.MenuSection key={index}>
        {section.map((item) => (
          <S.MenuItem key={item.title} onClick={() => item.onClick()}>
            <S.MenuItemContentMain data-test-id="item-title">
              {item.title}
            </S.MenuItemContentMain>
            {item?.hint && (
              <S.MenuItemContentSide data-test-id="item-hint">
                {item.hint.map((it) => (
                  <span key={it}>{it}</span>
                ))}
              </S.MenuItemContentSide>
            )}
          </S.MenuItem>
        ))}
      </S.MenuSection>
    ))}
  </>
)

const HelpMenu = forwardRef((_props, ref) => {
  const dispatch = useAppDispatch()
  const MENU_ITEMS_HELP = [
    {
      title: 'Keyboard shortcuts',
      onClick: () => dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.keyboard)),
      hint: [modifierKeyDisplay, '/'],
    },
    {
      title: 'Introduction',
      onClick: () => dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.intro)),
    },
  ]
  const MENU_ITEMS_FEEDBACK = [
    {
      title: 'Send feedback',
      onClick: () => dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.feedback)),
      hint: [modifierKeyDisplay, '.'],
    },
  ]
  const MENU_ITEMS_SOCIAL = [
    {
      title: 'Join us @ Slack',
      onClick: () =>
        window.open(import.meta.env.VITE_SLACK_SOCIAL_URL, '_blank'),
    },
  ]

  const combinedMenuItems = () => {
    // If the Slack Social is defined, show the menu item
    if (
      import.meta.env.VITE_SLACK_SOCIAL_URL &&
      import.meta.env.VITE_SLACK_SOCIAL_URL.length > 0
    ) {
      return [MENU_ITEMS_SOCIAL, MENU_ITEMS_HELP, MENU_ITEMS_FEEDBACK]
    }
    return [MENU_ITEMS_HELP, MENU_ITEMS_FEEDBACK]
  }

  return (
    <S.Layer ref={ref}>
      <S.InnerLayer>
        <S.Container>
          <MenuSection
            data-test-id="help-menu"
            menuItems={combinedMenuItems()}
          />
        </S.Container>
      </S.InnerLayer>
    </S.Layer>
  )
})

export default HelpMenu
