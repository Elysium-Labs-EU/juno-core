import React, {
  Children,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
} from 'react'

export interface IJsonStructureItem {
  children: ReactNode
  icon?: JSX.Element | null | undefined
  id: string
  onClick?: () =>
    | void
    | undefined
    | Promise<any>
    | { payload: string | null; type: string }
  index?: number
  keywords?: string[]
  href?: string | null | undefined
}

export interface IJsonStructure {
  heading?: string
  id: string
  items: (IJsonStructureItem | undefined)[]
}

export function getItemIndex(
  items: IJsonStructure[],
  id: string,
  startIndex: number = 0
) {
  return (
    items
      .map((list) => list.items)
      .reduce((a, b) => a.concat(b))
      .findIndex((i) => i?.id === id) + startIndex
  )
}

function getLabelFromChildren(children: ReactNode) {
  let label = ''

  Children.map(children, (child) => {
    if (typeof child === 'string') {
      label += child
    }
  })

  return label
}

function doesChildMatchSearch(search: string, children?: ReactNode) {
  return children
    ? getLabelFromChildren(children)
        .toLowerCase()
        .includes(search.toLowerCase())
    : false
}

function doesKeywordsMatchSearch(search: string, keywords: string[]) {
  return keywords.includes('*')
    ? true
    : keywords.some((keyword) =>
        keyword.toLowerCase().includes(search.toLowerCase())
      )
}

export default function filterItems(
  items: IJsonStructure[],
  search: string,
  {
    filterOnListHeading,
  }: {
    filterOnListHeading: boolean
  } = {
    filterOnListHeading: true,
  }
) {
  return items
    .filter((list) => {
      const listHasMatchingItem = list.items.some(
        (item) =>
          doesChildMatchSearch(search, item?.children) ||
          doesKeywordsMatchSearch(search, item?.keywords ?? [])
      )

      return filterOnListHeading
        ? list.heading?.toLowerCase().includes(search.toLowerCase()) ||
            listHasMatchingItem
        : listHasMatchingItem
    })
    .map((list) => {
      const matchingItems = list.items.filter(
        (item) =>
          doesChildMatchSearch(search, item?.children) ||
          doesKeywordsMatchSearch(search, item?.keywords ?? [])
      )

      const filteredList = () => {
        if (filterOnListHeading) {
          if (matchingItems.length) {
            return matchingItems
          }
          return list.items
        }
        return matchingItems
      }

      return {
        ...list,
        items: filteredList(),
      }
    })
}
