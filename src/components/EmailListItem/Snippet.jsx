import React from 'react'

const Snippet = ({ snippet }) => {
  // const LatestSnippet = email.slice(-1)

  return (
    <span className="snippet">
      {/* &nbsp;&nbsp;—&nbsp;&nbsp;{LatestSnippet[0].snippet} */}
      &nbsp;&nbsp;—&nbsp;&nbsp;{snippet}
    </span>
  )
}

export default Snippet
