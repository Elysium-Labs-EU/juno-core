import { useCallback, useMemo } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { Location, useLocation } from 'react-router-dom'

import * as global from '../../../constants/globalConstants'
import RoutesConstants from '../../../constants/routes.json'
import {
  QiCheckmarkDouble,
  QiCog,
  QiCompose,
  QiDiscard,
  QiFolderArchive,
  QiInbox,
  QiJump,
  QiToDo,
} from '../../../images/svgIcons/quillIcons'
import {
  selectEmailList,
  selectSelectedEmails,
} from '../../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds } from '../../../store/labelsSlice'
import { AppDispatch } from '../../../store/store'
import {
  archiveAllEmailCMDK,
  discardAllEmailCMDK,
  navigateTo,
  selectAllEmailsCurrentInbox,
  selectAllEmailsSender,
  selectIsFlexibleFlowActive,
  setActiveModal,
  startFocusModeCMDK,
} from '../../../store/utilsSlice'
import deduplicateItems from '../../../utils/deduplicateItems'
import getRecipientFromList from '../../../utils/getRecipientFromList'
import getSenderFromList from '../../../utils/getSenderFromList'
import multipleIncludes from '../../../utils/multipleIncludes'
import filterItems, { getItemIndex, IJsonStructure } from '../filterItems'
import ListItem from '../ListItem/ListItem'
import * as S from './CommandSuggestionStyles'

const defaultItems = ({
  dispatch,
  isFlexibleFlowActive,
  location,
}: {
  dispatch: AppDispatch
  isFlexibleFlowActive: boolean
  location: Location
}): IJsonStructure[] => [
  {
    heading: 'Suggestions',
    id: 'suggestions',
    items: [
      location.pathname !== RoutesConstants.DRAFTS
        ? {
            id: 'archive-all-current-box',
            children: 'Archive all loaded emails of current box',
            icon: <QiFolderArchive />,
            onClick: () => dispatch(selectAllEmailsSender(archiveAllEmailCMDK)),
          }
        : undefined,
      location.pathname === RoutesConstants.DRAFTS
        ? {
            id: 'discard-all-current-box',
            children: 'Discard all loaded emails of current box',
            icon: <QiDiscard />,
            onClick: () => dispatch(selectAllEmailsSender(discardAllEmailCMDK)),
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
            onClick: () => dispatch(navigateTo(RoutesConstants.COMPOSE_EMAIL)),
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

const CommandPalleteSuggestions = ({
  focusedItemIndex,
  searchValue,
}: {
  focusedItemIndex: number
  searchValue: undefined | string
}) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const emailList = useAppSelector(selectEmailList)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)

  const assembleItems = useCallback(() => {
    const itemsArray = defaultItems({
      dispatch,
      isFlexibleFlowActive,
      location,
    })

    // Do not use the selected emails whenever the user is not on the tagged emails page
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
      if (uniqueUsers.length > 1 && uniqueUsers.length < 3) {
        baseUseWith.items.push(
          location.pathname === RoutesConstants.TODO
            ? {
                id: 'select-all-from-all-selected-senders-to-do',
                children: (
                  <span>
                    Select all available To Do emails from{' '}
                    <span style={{ fontWeight: 600 }}>
                      all selected senders
                    </span>{' '}
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
                    <span style={{ fontWeight: 600 }}>
                      all selected senders
                    </span>
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
                    <span style={{ fontWeight: 600 }}>
                      all selected senders
                    </span>
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
              onClick: () =>
                dispatch(selectAllEmailsSender(archiveAllEmailCMDK)),
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
  }, [emailList, selectedEmails])

  const filteredItems = useMemo(
    () => filterItems(assembleItems(), searchValue ?? ''),
    [searchValue]
  )

  return (
    <div>
      {filteredItems.map((list) => (
        <div key={list.id} tabIndex={-1}>
          <S.ListHeader>{list.heading}</S.ListHeader>
          {list.items.map((item) => {
            if (item) {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  index={getItemIndex(filteredItems, item.id)}
                  focusedItemIndex={focusedItemIndex}
                  itemType={item.type}
                />
              )
            }
            return undefined
          })}
        </div>
      ))}
      {/* {searchValue
        ? filteredItems.map((list) => {
            console.log('list', list)

            return <div key={list.id}>test</div>
          })
        : defaultItems({ dispatch }).map((list) => (
            <div key={list.id} tabIndex={-1}>
              <S.ListHeader>{list.heading}</S.ListHeader>
              {list.items.map((item, index) => (
                <ListItem
                  key={item.id}
                  item={item}
                  index={index}
                  focusedItemIndex={focusedItemIndex}
                />
              ))}
            </div>
          ))} */}
    </div>
  )
}

export default CommandPalleteSuggestions
