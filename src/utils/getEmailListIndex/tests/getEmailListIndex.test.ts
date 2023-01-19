import { expect } from 'vitest'

import getEmailListIndex from '../getEmailListIndex'

test('getEmailListIndex returns the correct index', () => {
  const emailList = [
    { labels: ['label1', 'label2'] },
    { labels: ['label3', 'label4'] },
    { labels: ['label5', 'label2'] },
  ]
  const labelIds = ['label2']
  const expectedIndex = 0
  const index = getEmailListIndex({ emailList, labelIds })

  expect(index).toEqual(expectedIndex)
})

test('getEmailListIndex returns -1 when no match is found', () => {
  const emailList = [
    { labels: ['label1', 'label2'] },
    { labels: ['label3', 'label4'] },
    { labels: ['label5', 'label2'] },
  ]
  const labelIds = ['label6']
  const expectedIndex = -1
  const index = getEmailListIndex({ emailList, labelIds })

  expect(index).toEqual(expectedIndex)
})

test('getEmailListIndex returns -1 when emailList is empty', () => {
  const emailList = []
  const labelIds = ['label1']
  const expectedIndex = -1
  const index = getEmailListIndex({ emailList, labelIds })

  expect(index).toEqual(expectedIndex)
})

test('getEmailListIndex returns -1 when labelIds is empty', () => {
  const emailList = [
    { labels: ['label1', 'label2'] },
    { labels: ['label3', 'label4'] },
    { labels: ['label5', 'label2'] },
  ]
  const labelIds: any = []
  const expectedIndex = -1
  const index = getEmailListIndex({ emailList, labelIds })

  expect(index).toEqual(expectedIndex)
})
