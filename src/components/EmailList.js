import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { createApiClient } from '../data/api'
// import { db } from './firebase'
import './../App.scss'
// import { FiPaperclip } from "react-icons/fi";
import EmailListItem from './EmailListItem'

const api = createApiClient()

function EmailList() {
  const [emailList, setEmailList] = useState([])
  const [loading, setLoading] = useState('')

  // useEffect(() => {
  //   db.collection('emails').orderBy('timestamp', 'desc').onSnapshot(snapshot => setEmailList(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data()}))))
  // }, [])

  // useEffect(() => {
  //   setEmailList(api.getThreads())
  // }, [loading])

  const LoadEmails = async () => {
    const emails = await api.getThreads()
    setEmailList(emails || 'No emails loaded')
    console.log(emails)
  }

  return (
    <div>
      <button onClick={() => LoadEmails()}>Fetch Emails</button>
      <div className="scroll">
        <div className="tlOuterContainer">
          <div className="thread-list">
            {emailList ? (
              emailList
            ) : (
              // <div className="base">
              //   {emailList.map((email) => (
              //     <EmailListItem
              //       href={`mail/${email.id}`}
              //       key={email.id}
              //       email={email}
              //     />
              //   ))}
              // </div>
              <h2>Loading</h2>
            )}
          </div>
          <div className="d-flex justify-content-center"></div>
        </div>
      </div>
    </div>
  )
}

export default EmailList
