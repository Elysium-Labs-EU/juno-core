import React from 'react'

const Snippet = ({ email }) => {
  const LatestSnippet = email.slice(-1)

  return (
    <>
      <span className="snippet">&nbsp;&nbsp;—&nbsp;&nbsp;{LatestSnippet[0].snippet}</span>
    </>
  )
}

export default Snippet
