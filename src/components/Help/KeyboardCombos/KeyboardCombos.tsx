import CustomModal from 'components/Elements/Modal/CustomModal'
import * as global from 'constants/globalConstants'
import * as local from 'constants/keycomboConstants'
import { useAppSelector } from 'store/hooks'
import { selectActiveModal } from 'store/utilsSlice'
import { Paragraph, Span } from 'styles/globalStyles'
import getUserAgent from 'utils/getUserAgent'

import * as S from './KeyboardCombosStyles'

interface IKeyCombos {
  keys: Array<string> | Array<JSX.Element>
  subTitle?: string
  title: string
}

interface ICreateSectionWithKeys {
  keyCombos: Array<IKeyCombos>
  subTitle: string
  title: string
}

const CreateSectionWithKeys = ({
  keyCombos,
  title,
  subTitle,
}: ICreateSectionWithKeys) => (
  <S.SectionContainer>
    <div>
      <strong>{title}</strong>
    </div>
    <Span>{subTitle}</Span>
    {keyCombos.map((combo) => (
      <S.KeyComboContainer key={combo.title}>
        <div>{combo.title}</div>
        {combo?.subTitle && <Span muted>{combo?.subTitle}</Span>}
        <S.KeyBindShortcut>
          {combo.keys.map((oneKey) => (
            <Span key={JSON.stringify(oneKey)}>{oneKey}</Span>
          ))}
        </S.KeyBindShortcut>
      </S.KeyComboContainer>
    ))}
  </S.SectionContainer>
)

const KeyboardCombos = () => {
  const activeModal = useAppSelector(selectActiveModal)

  return (
    <CustomModal
      open={activeModal === global.ACTIVE_MODAL_MAP.keyboard}
      modalTitle={local.MODAL_TITLE}
      modalAriaLabel="keyboard-shortcuts"
      subTitle={
        <Paragraph muted style={{ marginBottom: 'var(--spacing-1)' }}>
          {local.MODAL_OS_SUB}{' '}
          <Span style={{ color: `var(--color-black)` }}>{getUserAgent()}</Span>
        </Paragraph>
      }
    >
      <S.Columns>
        <CreateSectionWithKeys
          title={local.GLOBAL_KEY_TITLE}
          subTitle={local.GLOBAL_KEY_SUB_TITLE}
          keyCombos={local.GLOBAL_KEY_COMBOS}
        />
        <CreateSectionWithKeys
          title={local.EMAIL_KEY_TITLE}
          subTitle={local.EMAIL_KEY_SUB_TITLE}
          keyCombos={local.EMAIL_DETAIL_COMBOS}
        />
        <CreateSectionWithKeys
          title={local.COMPOSE_KEY_TITLE}
          subTitle={local.COMPOSE_KEY_SUB_TITLE}
          keyCombos={local.COMPOSE_KEY_COMBOS}
        />
      </S.Columns>
    </CustomModal>
  )
}

export default KeyboardCombos
