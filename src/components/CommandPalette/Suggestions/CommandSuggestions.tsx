import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Stack from 'components/Elements/Stack/Stack'
import * as global from 'constants/globalConstants'
import { QiGift, QiSearch } from 'images/svgIcons/quillIcons'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSelectedEmails,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import { selectIsFlexibleFlowActive } from 'store/utilsSlice'

import contextualItems from './ContextualItems'
import SearchSuggestion from './SearchSuggestion'
import * as S from './SuggestionStyles'
import filterItems, { getItemIndex } from '../commandPaletteUtils'
import type { IJsonStructure } from '../commandPaletteUtils'
import ListItem from '../ListItem/ListItem'

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
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  const currentEmailBoxHasEmails = useMemo(() => {
    const threads = emailList?.[activeEmailListIndex]?.threads
    if (threads) {
      return threads.length > 0
    }
    return false
  }, [emailList, activeEmailListIndex])

  const filteredItems = useMemo(() => {
    const DISCORD_URL = import.meta.env.VITE_DISCORD_SOCIAL_URL
    if (searchValue) {
      const searchSuggestion: Array<IJsonStructure> = [
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
      const newSuggestion: Array<IJsonStructure> | undefined = DISCORD_URL
        ? [
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
                  onClick: () => window.open(DISCORD_URL, '_blank'),
                },
              ],
            },
          ]
        : undefined

      const filteredItemsWithSearch = [
        ...searchSuggestion,
        ...filterItems(
          contextualItems({
            currentEmailBoxHasEmails,
            dispatch,
            emailList,
            isFlexibleFlowActive,
            labelIds,
            location,
            selectedEmails,
          }),
          searchValue ?? ''
        ),
      ]
      if (newSuggestion) {
        filteredItemsWithSearch.push(...newSuggestion)
      }
      return filteredItemsWithSearch
    }
    return filterItems(
      contextualItems({
        currentEmailBoxHasEmails,
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
          <Stack direction="vertical" key={id} tabIndex={-1}>
            {heading && <S.ListHeader>{heading}</S.ListHeader>}
            <Stack
              direction="vertical"
              renderAs="ul"
              spacing="none"
              style={{ margin: '0', padding: '0' }}
              tabIndex={-1}
            >
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
            </Stack>
          </Stack>
        ))
      ) : (
        <S.ListHeader>{global.SOMETHING_WRONG}</S.ListHeader>
      )}
    </div>
  )
}

export default CommandPaletteSuggestions
