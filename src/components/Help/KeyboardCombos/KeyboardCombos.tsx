import CustomModal from 'components/Elements/Dialog/CustomDialog'
import Stack from 'components/Elements/Stack/Stack'
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
  <Stack direction="vertical" spacing="mini" style={{ width: '100%' }}>
    <div>
      <strong>{title}</strong>
    </div>
    <Span>{subTitle}</Span>
    {keyCombos.map((combo) => (
      <Stack direction="vertical" key={combo.title}>
        <div>{combo.title}</div>
        {combo?.subTitle ? <Span muted>{combo?.subTitle}</Span> : null}
        <Stack direction="horizontal" spacing="mini">
          {combo.keys.map((oneKey) => (
            <S.KeyBindShortcut key={JSON.stringify(oneKey)}>
              {oneKey}
            </S.KeyBindShortcut>
          ))}
        </Stack>
      </Stack>
    ))}
  </Stack>
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
      <Stack spacing="huge">
        <CreateSectionWithKeys
          keyCombos={local.GLOBAL_KEY_SHORTCUTS}
          subTitle={local.GLOBAL_KEY_SUB_TITLE}
          title={local.GLOBAL_KEY_TITLE}
        />
        <CreateSectionWithKeys
          keyCombos={local.EMAIL_DETAIL_SHORTCUTS}
          subTitle={local.EMAIL_KEY_SUB_TITLE}
          title={local.EMAIL_KEY_TITLE}
        />
        <CreateSectionWithKeys
          keyCombos={local.COMPOSE_KEY_SHORTCUTS}
          subTitle={local.COMPOSE_KEY_SUB_TITLE}
          title={local.COMPOSE_KEY_TITLE}
        />
      </Stack>
    </CustomModal>
  )
}

export default KeyboardCombos
