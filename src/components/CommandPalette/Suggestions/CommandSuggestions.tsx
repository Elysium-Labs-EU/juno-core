import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import * as global from '../../../constants/globalConstants'
import { QiGift, QiSearch } from '../../../images/svgIcons/quillIcons'
import {
  selectEmailList,
  selectSelectedEmails,
} from '../../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds } from '../../../store/labelsSlice'
import {
  selectIsFlexibleFlowActive,
  setActiveModal,
} from '../../../store/utilsSlice'
import filterItems, {
  getItemIndex,
  IJsonStructure,
} from '../commandPaletteUtils'
import ListItem from '../ListItem/ListItem'
import * as S from './SuggestionStyles'
import contextualItems from './ContextualItems'
import SearchSuggestion from './SearchSuggestion'

const CommandPaletteSuggestions = ({
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

  const filteredItems = useMemo(() => {
    if (searchValue) {
      const searchSuggestion: IJsonStructure[] = [
        {
          heading: undefined,
          id: 'search-option',
          items: [
            {
              id: 'search',
              children: <SearchSuggestion searchValue={searchValue} />,
              icon: <QiSearch />,
              type: 'Command',
            },
          ],
        },
      ]
      const newSuggestion: IJsonStructure[] = [
        {
          heading: 'More',
          id: 'suggestion-header',
          items: [
            {
              id: 'suggestion',
              children:
                'Cannot find what you are looking for? Try a different search term. Or make a suggestion.',
              icon: <QiGift />,
              type: 'Link',
              onClick: () =>
                dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.feedback)),
            },
          ],
        },
      ]
      const filteredItemsWithSearch = [
        ...searchSuggestion,
        ...filterItems(
          contextualItems({
            dispatch,
            emailList,
            isFlexibleFlowActive,
            labelIds,
            location,
            selectedEmails,
          }),
          searchValue ?? ''
        ),
        ...newSuggestion,
      ]
      return filteredItemsWithSearch
    }
    return filterItems(
      contextualItems({
        dispatch,
        emailList,
        isFlexibleFlowActive,
        labelIds,
        location,
        selectedEmails,
      }),
      searchValue ?? ''
    )
  }, [searchValue])

  return (
    <div>
      {filteredItems.length > 0 ? (
        filteredItems.map(({ heading, id, items }) => (
          <div key={id} tabIndex={-1}>
            {heading && <S.ListHeader>{heading}</S.ListHeader>}
            <S.ListUnordered tabIndex={-1}>
              {items.map((item) => {
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
            </S.ListUnordered>
          </div>
        ))
      ) : (
        <S.ListHeader>{global.SOMETHING_WRONG}</S.ListHeader>
      )}
    </div>
  )
}

export default CommandPaletteSuggestions
