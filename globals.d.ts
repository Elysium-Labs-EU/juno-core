/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.md' {
  const value: string // markdown is just a string
  export default value
}

declare module '*.png' {
  const value: any
  export default value
}

declare module '*.svg' {
  const value: any
  export default value
}

declare module '*.ttf' {
  const value: any
  export default value
}
