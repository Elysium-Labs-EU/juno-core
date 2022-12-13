import { FiEdit2 } from 'react-icons/fi'
import type { Location } from 'react-router-dom'

import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routes.json'
import {
  QiCheckmarkDouble,
  QiCog,
  QiCompose,
  QiDiscard,
  QiFolderArchive,
  QiInbox,
  QiToDo,
} from 'images/svgIcons/quillIcons'
import type { AppDispatch } from 'store/store'
import {
  archiveAllEmailCMDK,
  discardAllEmailCMDK,
  navigateTo,
  selectAllEmailsCurrentInbox,
  selectAllEmailsSender,
  setActiveModal,
} from 'store/utilsSlice'

import type { IJsonStructure } from '../commandPaletteUtils'

export default function defaultItems({
  dispatch,
  isFlexibleFlowActive,
  location,
}: {
  dispatch: AppDispatch
  isFlexibleFlowActive: boolean
  location: Location
}): IJsonStructure[] {
  return [
    {
      heading: 'Suggestions',
      id: 'suggestions',
      items: [
        location.pathname !== RoutesConstants.DRAFTS
          ? {
              id: 'archive-all-current-box',
              children: 'Archive all loaded emails of current box',
              icon: <QiFolderArchive />,
              onClick: () =>
                dispatch(selectAllEmailsSender(archiveAllEmailCMDK)),
            }
          : undefined,
        location.pathname === RoutesConstants.DRAFTS
          ? {
              id: 'discard-all-current-box',
              children: 'Discard all loaded emails of current box',
              icon: <QiDiscard />,
              onClick: () =>
                dispatch(selectAllEmailsSender(discardAllEmailCMDK)),
            }
          : undefined,
        location.pathname !== RoutesConstants.TODO
          ? {
              id: 'to-do',
              children: 'To Do',
              icon: <QiToDo />,
              onClick: () => dispatch(navigateTo(RoutesConstants.TODO)),
            }
          : undefined,
        {
          id: `select-all-current-box`,
          children: `Select all available emails of current box`,
          icon: <QiCheckmarkDouble />,
          onClick: () => dispatch(selectAllEmailsCurrentInbox()),
        },
        location.pathname !== RoutesConstants.INBOX && isFlexibleFlowActive
          ? {
              id: 'inbox',
              children: 'Inbox',
              icon: <QiInbox />,
              onClick: () => dispatch(navigateTo(RoutesConstants.INBOX)),
            }
          : undefined,
        location.pathname !== RoutesConstants.DRAFTS
          ? {
              id: 'drafts',
              children: 'Drafts',
              icon: <FiEdit2 />,
              onClick: () => dispatch(navigateTo(RoutesConstants.DRAFTS)),
              type: 'Link',
            }
          : undefined,
        location.pathname !== RoutesConstants.COMPOSE_EMAIL
          ? {
              id: 'compose',
              children: 'Compose',
              icon: <QiCompose />,
              onClick: () =>
                dispatch(navigateTo(RoutesConstants.COMPOSE_EMAIL)),
              type: 'Link',
            }
          : undefined,
        {
          id: 'settings',
          children: 'Settings',
          icon: <QiCog />,
          onClick: () =>
            dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.settings)),
          type: 'Link',
        },
      ],
    },
  ]
}
