/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'vitest'

import getEmailListIndex from '../getEmailListIndex'

describe('getEmailListIndex function', () => {
  it('getEmailListIndex returns the correct index', () => {
    const emailList = [
      { threads: [], nextPageToken: '', labels: ['label1', 'label2'] },
      { threads: [], nextPageToken: '', labels: ['label3', 'label4'] },
      { threads: [], nextPageToken: '', labels: ['label5', 'label2'] },
    ]
    const labelIds = ['label2']
    const expectedIndex = 0
    const index = getEmailListIndex({ emailList, labelIds })

    expect(index).toEqual(expectedIndex)
  })

  it('getEmailListIndex returns -1 when no match is found', () => {
    const emailList = [
      { threads: [], nextPageToken: '', labels: ['label1', 'label2'] },
      { threads: [], nextPageToken: '', labels: ['label3', 'label4'] },
      { threads: [], nextPageToken: '', labels: ['label5', 'label2'] },
    ]
    const labelIds = ['label6']
    const expectedIndex = -1
    const index = getEmailListIndex({ emailList, labelIds })

    expect(index).toEqual(expectedIndex)
  })

  it('getEmailListIndex returns -1 when emailList is empty', () => {
    const emailList: Array<any> = []
    const labelIds = ['label1']
    const expectedIndex = -1
    const index = getEmailListIndex({ emailList, labelIds })

    expect(index).toEqual(expectedIndex)
  })

  it('getEmailListIndex returns -1 when labelIds is empty', () => {
    const emailList = [
      { threads: [], nextPageToken: '', labels: ['label1', 'label2'] },
      { threads: [], nextPageToken: '', labels: ['label3', 'label4'] },
      { threads: [], nextPageToken: '', labels: ['label5', 'label2'] },
    ]
    const labelIds: Array<any> = []
    const expectedIndex = -1
    const index = getEmailListIndex({ emailList, labelIds })

    expect(index).toEqual(expectedIndex)
  })
})
