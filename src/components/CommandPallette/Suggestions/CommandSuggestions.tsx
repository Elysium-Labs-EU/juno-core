import { FiEdit2 } from 'react-icons/fi'
import { Location, useLocation } from 'react-router-dom'

import * as global from '../../../constants/globalConstants'
import RoutesConstants from '../../../constants/routes.json'
import {
  QiCog,
  QiCompose,
  QiFolderArchive,
  QiJump,
  QiStack,
  QiToDo,
} from '../../../images/svgIcons/quillIcons'
import {
  selectEmailList,
  selectSelectedEmails,
} from '../../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { AppDispatch } from '../../../store/store'
import {
  navigateTo,
  selectAllEmailsSenderForFocusMode,
  setActiveModal,
} from '../../../store/utilsSlice'
import getSenderFromList from '../../../utils/getSenderFromList'
import filterItems, { getItemIndex, IJsonStructure } from '../filterItems'
import ListItem from '../ListItem/ListItem'
import * as S from './CommandSuggestionStyles'

const defaultItems = ({
  dispatch,
  location,
}: {
  dispatch: AppDispatch
  location: Location
}): IJsonStructure[] => [
  {
    heading: 'Suggestions',
    id: 'suggestions',
    items: [
      location.pathname !== RoutesConstants.TODO
        ? {
            id: 'to-do',
            children: 'To Do',
            icon: <QiToDo />,
            onClick: () => dispatch(navigateTo(RoutesConstants.TODO)),
          }
        : undefined,
      location.pathname !== RoutesConstants.DRAFTS
        ? {
            id: 'drafts',
            children: 'Drafts',
            icon: <FiEdit2 />,
            onClick: () => dispatch(navigateTo(RoutesConstants.DRAFTS)),
          }
        : undefined,
      location.pathname !== RoutesConstants.COMPOSE_EMAIL
        ? {
            id: 'compose',
            children: 'Compose',
            icon: <QiCompose />,
            onClick: () => dispatch(navigateTo(RoutesConstants.COMPOSE_EMAIL)),
          }
        : undefined,
      {
        id: 'settings',
        children: 'Settings',
        icon: <QiCog />,
        onClick: () =>
          dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.settings)),
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
  const selectedEmails = useAppSelector(selectSelectedEmails)

  console.log('location', location)

  console.log(searchValue)
  const filteredItems = filterItems(
    defaultItems({ dispatch, location }).concat([
      {
        heading: 'Use with',
        id: 'use-with',
        items: [
          selectedEmails.selectedIds.length === 1
            ? {
                id: 'select-all-from-sender',
                children: `Select all loaded To Do emails from ${
                  getSenderFromList({ selectedEmails, emailList })[0].split(
                    '<'
                  )[0]
                } for Focus mode`,
                icon: <QiJump />,
                onClick: () => dispatch(selectAllEmailsSenderForFocusMode()),
              }
            : undefined,
          selectedEmails.selectedIds.length === 1
            ? {
                id: 'archive-all-from-sender',
                children: `Archive all loaded emails from ${
                  getSenderFromList({ selectedEmails, emailList })[0].split(
                    '<'
                  )[0]
                }`,
                icon: <QiFolderArchive />,
                onClick: () => dispatch(selectAllEmailsSenderForFocusMode()),
              }
            : undefined,
        ],
      },
    ]),
    searchValue ?? ''
  )

  console.log('focusedItemIndex', focusedItemIndex)
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
