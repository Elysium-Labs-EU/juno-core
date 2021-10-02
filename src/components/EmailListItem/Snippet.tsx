import React from 'react'

const Snippet = ({ snippet }: { snippet: string }) => {
    if (snippet.length > 0) return <span className="snippet">&nbsp;&nbsp;—&nbsp;&nbsp;{snippet}</span>
    return null
}

export default Snippet
