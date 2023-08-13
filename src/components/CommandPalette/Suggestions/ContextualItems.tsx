import type { Location } from 'react-router-dom'

import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import {
  QiDiscard,
  QiFolderArchive,
  QiFolderTrash,
  QiJump,
} from 'images/svgIcons/quillIcons'
import type { AppDispatch } from 'store/store'
import type { TEmailListState } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import {
  archiveAllEmailCMDK,
  deleteAllEmailCMDK,
  discardAllEmailCMDK,
  selectAllEmailsSender,
  startFocusModeCMDK,
} from 'store/utilsSlice'
import { Span } from 'styles/globalStyles'
import deduplicateItems from 'utils/deduplicateItems'
import getRecipientFromList from 'utils/getRecipientFromList'
import getSenderFromList from 'utils/getSenderFromList'
import multipleIncludes from 'utils/multipleIncludes'

import defaultItems from './DefaultItems'
import type { IJsonStructure } from '../commandPaletteUtils'

interface ContextualItems {
  currentEmailBoxHasEmails: boolean
  dispatch: AppDispatch
  emailList: TEmailListState['emailList']
  isFlexibleFlowActive: boolean
  labelIds: TLabelState['labelIds']
  location: Location
  selectedEmails: TEmailListState['selectedEmails']
}

// TODO: Refactor this function to be more readable.
export default function contextualItems({
  currentEmailBoxHasEmails,
  dispatch,
  emailList,
  isFlexibleFlowActive,
  labelIds,
  location,
  selectedEmails,
}: ContextualItems): IJsonStructure[] {
  const itemsArray = defaultItems({
    currentEmailBoxHasEmails,
    dispatch,
    isFlexibleFlowActive,
    location,
  })

  // Do not use the selected emails whenever the user is not on the tagged emails' page
  if (
    selectedEmails &&
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
                <Span>
                  Select all available To Do emails from{' '}
                  <Span style={{ fontWeight: 600 }}>all selected senders</Span>{' '}
                  for Focus mode
                </Span>
              ),
              icon: <QiJump />,
              onClick: () =>
                dispatch(selectAllEmailsSender(startFocusModeCMDK)),
            }
          : undefined,
        location.pathname !== RoutesConstants.DRAFT
          ? {
              id: 'archive-all-from-all-selected-senders',
              children: (
                <Span>
                  Archive all available emails from{' '}
                  <Span style={{ fontWeight: 600 }}>all selected senders</Span>
                </Span>
              ),
              icon: <QiFolderArchive />,
              onClick: () =>
                dispatch(selectAllEmailsSender(archiveAllEmailCMDK)),
            }
          : undefined,
        location.pathname === RoutesConstants.DRAFT
          ? {
              id: 'discard-all-from-all-selected-senders',
              children: (
                <Span>
                  Discard all available drafts from{' '}
                  <Span style={{ fontWeight: 600 }}>all selected senders</Span>
                </Span>
              ),
              icon: <QiDiscard />,
              onClick: () =>
                dispatch(selectAllEmailsSender(discardAllEmailCMDK)),
            }
          : undefined
      )
    }
    baseUseWith.items.push(
      location.pathname === RoutesConstants.DRAFT
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
      {
        id: 'delete-all-selection',
        children: 'Delete all selection',
        icon: <QiFolderTrash />,
        onClick: () => dispatch(deleteAllEmailCMDK()),
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
                  <Span>
                    Select all available To Do emails from{' '}
                    <Span style={{ fontWeight: 600 }}>{nameOfUser}</Span> for
                    Focus mode
                  </Span>
                ),
                icon: <QiJump />,
                onClick: () =>
                  dispatch(selectAllEmailsSender(startFocusModeCMDK)),
              }
            : undefined,
          {
            id: `archive-all-from-${nameOfUser}`,
            children: (
              <Span>
                Archive all available emails from{' '}
                <Span style={{ fontWeight: 600 }}>{nameOfUser}</Span>
              </Span>
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
