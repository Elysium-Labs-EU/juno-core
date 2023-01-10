import type { Location } from 'react-router-dom'

import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import { QiDiscard, QiFolderArchive, QiJump } from 'images/svgIcons/quillIcons'
import type { AppDispatch } from 'store/store'
import {
  IEmailListObject,
  ISelectedEmail,
} from 'store/storeTypes/emailListTypes'
import {
  archiveAllEmailCMDK,
  discardAllEmailCMDK,
  selectAllEmailsSender,
  startFocusModeCMDK,
} from 'store/utilsSlice'
import deduplicateItems from 'utils/deduplicateItems'
import getRecipientFromList from 'utils/getRecipientFromList'
import getSenderFromList from 'utils/getSenderFromList'
import multipleIncludes from 'utils/multipleIncludes'

import type { IJsonStructure } from '../commandPaletteUtils'
import defaultItems from './DefaultItems'

export default function contextualItems({
  dispatch,
  emailList,
  isFlexibleFlowActive,
  labelIds,
  location,
  selectedEmails,
}: {
  dispatch: AppDispatch
  emailList: IEmailListObject[]
  isFlexibleFlowActive: boolean
  labelIds: string[]
  location: Location
  selectedEmails: ISelectedEmail
}): IJsonStructure[] {
  const itemsArray = defaultItems({
    dispatch,
    isFlexibleFlowActive,
    location,
  })

  // Do not use the selected emails whenever the user is not on the tagged emails' page
  if (
    selectedEmails.selectedIds.length > 0 &&
    selectedEmails.labelIds.length > 0 &&
    multipleIncludes(labelIds, selectedEmails.labelIds)
  ) {
    const baseUseWith: IJsonStructure = {
      heading: 'Use with',
      id: 'use-with',
      items: [],
    }

    let uniqueUsers = []
    if (
      !selectedEmails.labelIds.includes(global.DRAFT_LABEL) &&
      !selectedEmails.labelIds.includes(global.SENT_LABEL)
    ) {
      uniqueUsers = deduplicateItems(
        getSenderFromList({
          selectedEmails,
          emailList,
        })
      )
    } else {
      uniqueUsers = deduplicateItems(
        getRecipientFromList({
          selectedEmails,
          emailList,
        })
      )
    }
    if (uniqueUsers.length > 1) {
      baseUseWith.items.push(
        location.pathname === RoutesConstants.TODO
          ? {
              id: 'select-all-from-all-selected-senders-to-do',
              children: (
                <span>
                  Select all available To Do emails from{' '}
                  <span style={{ fontWeight: 600 }}>all selected senders</span>{' '}
                  for Focus mode
                </span>
              ),
              icon: <QiJump />,
              onClick: () =>
                dispatch(selectAllEmailsSender(startFocusModeCMDK)),
            }
          : undefined,
        location.pathname !== RoutesConstants.DRAFTS
          ? {
              id: 'archive-all-from-all-selected-senders',
              children: (
                <span>
                  Archive all available emails from{' '}
                  <span style={{ fontWeight: 600 }}>all selected senders</span>
                </span>
              ),
              icon: <QiFolderArchive />,
              onClick: () =>
                dispatch(selectAllEmailsSender(archiveAllEmailCMDK)),
            }
          : undefined,
        location.pathname === RoutesConstants.DRAFTS
          ? {
              id: 'discard-all-from-all-selected-senders',
              children: (
                <span>
                  Discard all available drafts from{' '}
                  <span style={{ fontWeight: 600 }}>all selected senders</span>
                </span>
              ),
              icon: <QiDiscard />,
              onClick: () =>
                dispatch(selectAllEmailsSender(discardAllEmailCMDK)),
            }
          : undefined
      )
    }
    baseUseWith.items.push(
      location.pathname === RoutesConstants.DRAFTS
        ? {
            id: 'discard-all-selection',
            children: 'Discard all selection',
            icon: <QiDiscard />,
            onClick: () => dispatch(discardAllEmailCMDK()),
          }
        : {
            id: 'archive-all-selection',
            children: 'Archive all selection',
            icon: <QiFolderArchive />,
            onClick: () => dispatch(archiveAllEmailCMDK()),
          },
      location.pathname === RoutesConstants.TODO
        ? {
            id: 'Focus-with-selection',
            children: 'Focus with selection',
            icon: <QiJump />,
            onClick: () => dispatch(startFocusModeCMDK()),
          }
        : undefined
    )
    if (uniqueUsers.length < 3) {
      uniqueUsers.forEach((user) => {
        const nameOfUser = user?.split('<')[0] ?? user
        baseUseWith.items.push(
          location.pathname === RoutesConstants.TODO
            ? {
                id: `select-all-from-${nameOfUser}-to-do`,
                children: (
                  <span>
                    Select all available To Do emails from{' '}
                    <span style={{ fontWeight: 600 }}>{nameOfUser}</span> for
                    Focus mode
                  </span>
                ),
                icon: <QiJump />,
                onClick: () =>
                  dispatch(selectAllEmailsSender(startFocusModeCMDK)),
              }
            : undefined,
          {
            id: `archive-all-from-${nameOfUser}`,
            children: (
              <span>
                Archive all available emails from{' '}
                <span style={{ fontWeight: 600 }}>{nameOfUser}</span>
              </span>
            ),
            icon: <QiFolderArchive />,
            onClick: () => dispatch(selectAllEmailsSender(archiveAllEmailCMDK)),
          }
        )
      })
    }
    // Only populate the array whenever there are suggestions
    if (baseUseWith.items.filter((item) => item !== undefined).length > 0) {
      itemsArray.push(baseUseWith)
    }
  }
  return itemsArray.reverse()
}
