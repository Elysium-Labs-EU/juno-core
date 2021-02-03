import React, { useEffect, useState } from 'react'

function LoadMore() {
  const [email, setEmailList] = useState([])

  function executeLoadMore() {
    // if (login != null) {
    return window.gapi.client.gmail.users.threads
      .list({
        userId: 'me',
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          response.result.threads.forEach((thread) => {
            return window.gapi.client.gmail.users.threads
              .get({
                userId: 'me',
                id: `${thread.id}`,
                format: 'metadata',
                nextPageToken: '05588773254893134699',
              })

              .then(
                function (response) {
                  // console.log("thread.id",thread.id)
                  // console.log("email.id",email.id)

                  //Set the state with the latest emails (first page only) and  filter out duplicate thread ids.

                  if (thread.id !== email.id) {
                    setEmailList((prevState) =>
                      [...prevState, response.result].filter(
                        (email, index, self) =>
                          index === self.findIndex((e) => e.id === email.id)
                      )
                    )
                  }
                },

                function (err) {
                  console.error('Execute error', err)
                }
              )
          })
        },

        function (err) {
          console.error('Execute error', err)
        }
      )
  }

  return (
    <div>
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => executeLoadMore()}
      >
        Load more
      </button>
    </div>
  )
}
// } else {
//   console.log("Authorize before loading more")
//

export default LoadMore
