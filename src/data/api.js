// const gapi =

export const createApiClient = () => {
  return {
    initGapi: () => {
      window.gapi.load('client:auth2', () => {
        window.gapi.auth2
          .init({
            client_id:
              process.env.REACT_APP_CLIENT_ID,
          })
          .then(() => console.log('Loaded'))
      })
    },
    authenticate: () => {
      window.gapi.auth2
        .getAuthInstance()
        .signIn({
          scope:
            'https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly',
        })
        .then(
          () => console.log('Sign-in successful'),
          (err) => console.error('Error signing in', err)
        )
    },
    loadClient: () => {
      window.gapi.client.setApiKey(process.env.REACT_APP_GAPI_API_KEY)
      window.gapi.client
        .load('https://gmail.googleapis.com/$discovery/rest?version=v1')
        .then(
          () => console.log('GAPI client loaded for API'),
          (err) => {
            console.error('Error loading GAPI client for API', err)
          }
        )
    },
    getThreads: () => {
      return window.gapi.client.gmail.users.threads
        .list({
          userId: 'me',
          maxResults: 1,
        })
        .then((response) => JSON.stringify(response.result.threads))
    },
  }
}

// //Get initial list of items, newest are loaded first
// useEffect(() => {
//   if (login != null) {
//     return window.gapi.client.gmail.users.threads
//       .list({
//         userId: 'me',
//         maxResults: 20,
//       })
//       .then(
//         function (response) {
//           //The list is enhanced with more data using another call per thread id.
//           response.result.threads.forEach((thread) => {
//             return window.gapi.client.gmail.users.threads
//               .get({
//                 userId: 'me',
//                 // "id": `${thread.id}`,
//               })

//               .then(
//                 function (response) {
//                   // console.log("thread.id",thread.id)
//                   // console.log("email.id",email.id)

//                   //Set the state with the latest emails (first page only) and  filter out duplicate thread ids.

//                   //NOTE! This setting should only be triggered whenever the id is different. Right now it is running the code 100 times
//                   //to check each line if they aren't duplicate, it should be prevented from running in the first place.
//                   //add .sort() functionality

//                   if (thread.id !== email.id) {
//                     setEmailList((prevState) =>
//                       [...prevState, response.result].filter(
//                         (email, index, self) =>
//                           index === self.findIndex((e) => e.id === email.id)
//                       )
//                     )
//                   }

//                   // setEmailList(prevState =>
//                   //   [...new Set ([...prevState, response.result])])
//                 },

//                 function (err) {
//                   console.error('Execute error', err)
//                 }
//               )
//           })
//         },

//         function (err) {
//           console.error('Execute error', err)
//         }
//       )
//   }
// }, [login])
// // }, [])

// function loadMore() {
//   // if (login != null) {
//   return window.gapi.client.gmail.users.threads
//     .list({
//       userId: 'me',
//       maxResults: 20,
//     })
//     .then(
//       function (response) {
//         // Handle the results here (response.result has the parsed body).
//         response.result.threads.forEach((thread) => {
//           return window.gapi.client.gmail.users.threads
//             .get({
//               userId: 'me',
//               id: `${thread.id}`,
//               format: 'metadata',
//               nextPageToken: '05588773254893134699',
//             })

//             .then(
//               function (response) {
//                 // console.log("thread.id",thread.id)
//                 // console.log("email.id",email.id)

//                 //Set the state with the latest emails (first page only) and  filter out duplicate thread ids.

//                 if (thread.id !== email.id) {
//                   setEmailList((prevState) =>
//                     [...prevState, response.result].filter(
//                       (email, index, self) =>
//                         index === self.findIndex((e) => e.id === email.id)
//                     )
//                   )
//                 }
//               },

//               function (err) {
//                 console.error('Execute error', err)
//               }
//             )
//         })
//       },

//       function (err) {
//         console.error('Execute error', err)
//       }
//     )
//   // } else {
//   //   console.log("Authorize before loading more")
//   // }
// }
