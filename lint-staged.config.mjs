import { ESLint } from 'eslint'

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    })
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles.join(' ')
}

export default {
  '*.{js,jsx,ts,tsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [`eslint --max-warnings=10 ${filesToLint}`]
  },
  '*.{js,jsx,ts,tsx}': ['dprint fmt'],
  // '*.{ts,tsx}': ['tsc-files --noEmit'],
}