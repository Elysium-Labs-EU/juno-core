import { Children } from 'react'
import type { ReactElement, ReactNode } from 'react'

import type { TListItemType } from './ListItem/ListItem'

interface IJsonStructureItem {
  children: ReactNode
  href?: string | null | undefined
  icon?: JSX.Element | null | undefined
  id: string
  index?: number
  keywords?: Array<string>
  onClick?: () =>
    | undefined
    | Promise<unknown>
    | { payload: string | null; type: string }
    | null
    | Window
  showType?: boolean
  type?: TListItemType
}

export interface IJsonStructure {
  heading?: string
  id: string
  items: Array<IJsonStructureItem | undefined>
}

function retrieveChildrenFromElement(item: unknown) {
  if (typeof item === 'object' && item !== null && 'props' in item && typeof item.props === 'object'
    && item.props !== null && 'children' in item.props && typeof item.props.children === 'object') {
    const fetchedChildren = item.props.children
    if (
      Array.isArray(fetchedChildren) &&
      fetchedChildren.some(
        (child) => typeof child === 'object' && child !== null
      )
    ) {
      let output = ''
      const recursiveChildrenCheck = (input: Array<unknown>) => {
        input.forEach((child) => {
          if (typeof child === 'string') {
            output += child
            return
          }
          if (typeof child === 'object' && child !== null && 'props' in child && typeof child.props === 'object' && child.props !== null && 'children' in child.props) {
            if (Array.isArray(child.props.children)) {
              recursiveChildrenCheck(child.props.children)
            } else if (typeof child.props.children === 'string') {
              output += child.props.children
            }
          }
        })
      }
      recursiveChildrenCheck(fetchedChildren)
      return output
    } else if (typeof fetchedChildren === 'string') {
      return fetchedChildren
    }
  }
  return item
}

function getAllItems(items: Array<IJsonStructure>) {
  return items.flatMap((list) => list.items)
}

export function getItemIndex(
  items: Array<IJsonStructure>,
  id: string,
  startIndex: number = 0
) {
  return getAllItems(items).findIndex((i) => i?.id === id) + startIndex
}

function getLabelFromChildren(children: ReactNode) {
  let label = ''

  Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      label += child
    } else if (child !== null && typeof child === 'object') {
      const typeCastChild = child as ReactElement
      const foundNestedLabel = retrieveChildrenFromElement(typeCastChild)
      if (typeof foundNestedLabel === 'string') {
        label += foundNestedLabel
      }
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

function doesKeywordsMatchSearch(search: string, keywords: Array<string>) {
  return keywords.includes('*')
    ? true
    : keywords.some((keyword) =>
      keyword.toLowerCase().includes(search.toLowerCase())
    )
}

export default function filterItems(
  items: Array<IJsonStructure>,
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
