import { expect } from 'vitest'

import countUniqueFiles from '../countUniqueFiles'

test('countUniqueFiles', (t) => {
  const activeThread = {
    messages: [
      { payload: { files: [{ id: 'file1' }, { id: 'file2' }] } },
      { payload: { files: [{ id: 'file3' }, { id: 'file4' }] } },
      { payload: { files: [{ id: 'file5' }, { id: 'file6' }] } },
    ],
  }

  const result = countUniqueFiles(activeThread)
  expect(t).toBe(result)
})
