import { Children } from 'react'
import type { ReactElement, ReactNode } from 'react'

import type { TListItemType } from './ListItem/ListItem'

export interface IJsonStructureItem {
  children: ReactNode
  href?: string | null | undefined
  icon?: JSX.Element | null | undefined
  id: string
  index?: number
  keywords?: Array<string>
  onClick?: () =>
    | void
    | undefined
    | Promise<any>
    | { payload: string | null; type: string }
  showType?: boolean
  type?: TListItemType
}

export interface IJsonStructure {
  heading?: string
  id: string
  items: Array<IJsonStructureItem | undefined>
}

function retrieveChildrenFromElement(item: ReactElement) {
  if (typeof item === 'object' && item !== null) {
    const fetchedChildren = item.props.children
    if (
      Array.isArray(fetchedChildren) &&
      fetchedChildren.some(
        (child) => typeof child === 'object' && child !== null
      )
    ) {
      let output = ''
      const recursiveChildrenCheck = (input: Array<string | ReactElement>) => {
        input.forEach((child) => {
          if (typeof child === 'string') {
            output += child
          }
          if (Array.isArray(child)) {
            recursiveChildrenCheck(child)
          }
          if (typeof child === 'object' && child !== null) {
            if (Array.isArray(child.props.children)) {
              recursiveChildrenCheck(child.props.children)
            }
            if (typeof child.props.children === 'string') {
              output += child.props.children
            }
          }
        })
      }
      recursiveChildrenCheck(fetchedChildren)
      return output
    }
    let output = ''
    if (Array.isArray(fetchedChildren)) {
      fetchedChildren.forEach((child) => {
        if (typeof child === 'string') {
          output += child
        }
      })
    }
    return output
  }
  return item
}

export function getAllItems(items: Array<IJsonStructure>) {
  return items.map((list) => list.items).reduce((a, b) => a.concat(b))
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
      label += foundNestedLabel
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
