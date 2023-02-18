import { expect } from 'vitest'

import { emailListThreadItem } from './constants'
import countUniqueFiles from '../countUniqueFiles'

test('countUniqueFiles', () => {
  const fileCount = 3

  const result = countUniqueFiles(emailListThreadItem)
  expect(result).toEqual(fileCount)
})
