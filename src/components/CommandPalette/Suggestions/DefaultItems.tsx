import { FiEdit2 } from 'react-icons/fi'
import type { Location } from 'react-router-dom'

import * as global from 'constants/globalConstants'
import { getHeaderByRoute } from 'constants/labelMapConstant'
import RoutesConstants from 'constants/routesConstants'
import {
  QiCheckmarkDouble,
  QiCog,
  QiCommand,
  QiCompose,
  QiDiscard,
  QiFolderArchive,
  QiFolderTrash,
  QiInbox,
  QiSend,
  QiToDo,
} from 'images/svgIcons/quillIcons'
import type { AppDispatch } from 'store/store'
import {
  archiveAllEmailCMDK,
  deleteAllEmailCMDK,
  discardAllEmailCMDK,
  navigateTo,
  selectAllEmailsCurrentInbox,
  setActiveModal,
} from 'store/utilsSlice'

import type { IJsonStructure } from '../commandPaletteUtils'

interface IDefaultItems {
  currentEmailBoxHasEmails: boolean
  dispatch: AppDispatch
  isFlexibleFlowActive: boolean
  location: Location
}

export default function defaultItems({
  currentEmailBoxHasEmails,
  dispatch,
  isFlexibleFlowActive,
  location,
}: IDefaultItems): Array<IJsonStructure> {
  const isEmailDetailPage = location.pathname.startsWith('/mail/')
  const isDraftsPage = location.pathname.startsWith(RoutesConstants.DRAFT)
  const isArchivePage = location.pathname.startsWith(RoutesConstants.ARCHIVE)
  const isTrashPage = location.pathname.startsWith(RoutesConstants.TRASH)
  const isComposePage =
    location.pathname.startsWith(RoutesConstants.COMPOSE_EMAIL) ||
    location.pathname.startsWith('/compose')

  return [
    {
      heading: 'Suggestions',
      id: 'suggestions',
      items: [
        !isDraftsPage &&
        currentEmailBoxHasEmails &&
        !isEmailDetailPage &&
        !isArchivePage &&
        !isComposePage
          ? {
              id: 'archive-all-current-box',
              children: `Archive all loaded emails of ${
                getHeaderByRoute[location.pathname]
              }`,
              icon: <QiFolderArchive />,
              onClick: () =>
                dispatch(selectAllEmailsCurrentInbox(archiveAllEmailCMDK)),
            }
          : undefined,
        !isEmailDetailPage &&
        currentEmailBoxHasEmails &&
        !isDraftsPage &&
        !isTrashPage &&
        !isComposePage
          ? {
              id: 'delete-all-current-box',
              children: `Delete all loaded emails of ${
                getHeaderByRoute[location.pathname]
              }`,
              icon: <QiFolderTrash />,
              onClick: () =>
                dispatch(selectAllEmailsCurrentInbox(deleteAllEmailCMDK)),
            }
          : undefined,
        location.pathname === RoutesConstants.DRAFT && currentEmailBoxHasEmails
          ? {
              id: 'discard-all-current-box',
              children: `Discard all loaded emails of ${
                getHeaderByRoute[location.pathname]
              }`,
              icon: <QiDiscard />,
              onClick: () =>
                dispatch(selectAllEmailsCurrentInbox(discardAllEmailCMDK)),
            }
          : undefined,
        isEmailDetailPage || !currentEmailBoxHasEmails || isComposePage
          ? undefined
          : {
              id: `select-all-current-box`,
              children: `Select all available emails of ${
                getHeaderByRoute[location.pathname]
              }`,
              icon: <QiCheckmarkDouble />,
              onClick: () => dispatch(selectAllEmailsCurrentInbox()),
            },
        location.pathname !== RoutesConstants.TODO
          ? {
              id: 'to-do',
              children: 'To Do',
              icon: <QiToDo />,
              onClick: () => dispatch(navigateTo(RoutesConstants.TODO)),
              type: 'Link',
            }
          : undefined,
        location.pathname !== RoutesConstants.INBOX && isFlexibleFlowActive
          ? {
              id: 'inbox',
              children: 'Inbox',
              icon: <QiInbox />,
              onClick: () => dispatch(navigateTo(RoutesConstants.INBOX)),
              type: 'Link',
            }
          : undefined,
        location.pathname !== RoutesConstants.DRAFT
          ? {
              id: 'drafts',
              children: 'Drafts',
              icon: <FiEdit2 />,
              onClick: () => dispatch(navigateTo(RoutesConstants.DRAFT)),
              type: 'Link',
            }
          : undefined,
        location.pathname !== RoutesConstants.SENT
          ? {
              id: 'sent',
              children: 'Sent',
              icon: <QiSend />,
              onClick: () => dispatch(navigateTo(RoutesConstants.SENT)),
              type: 'Link',
            }
          : undefined,
        location.pathname !== RoutesConstants.ARCHIVE
          ? {
              id: 'archive',
              children: 'Archive',
              icon: <QiFolderArchive />,
              onClick: () => dispatch(navigateTo(RoutesConstants.ARCHIVE)),
              type: 'Link',
            }
          : undefined,
        location.pathname !== RoutesConstants.TRASH
          ? {
              id: 'trash',
              children: 'Trash',
              icon: <QiFolderTrash />,
              onClick: () => dispatch(navigateTo(RoutesConstants.TRASH)),
              type: 'Link',
            }
          : undefined,
        !isComposePage
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
        {
          id: 'keyboard-shortcuts',
          children: 'Keyboard shortcuts',
          icon: <QiCommand />,
          onClick: () =>
            dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.keyboard)),
          type: 'Link',
        },
      ],
    },
  ]
}
