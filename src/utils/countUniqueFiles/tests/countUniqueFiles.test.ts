import { expect } from 'vitest'

import countUniqueFiles from '../countUniqueFiles'
import { emailListThreadItem } from './constants'

test('countUniqueFiles', () => {
  const fileCount = 3

  const result = countUniqueFiles(emailListThreadItem)
  expect(result).toEqual(fileCount)
})
