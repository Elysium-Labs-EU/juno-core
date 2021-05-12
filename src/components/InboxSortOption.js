import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './InboxSortOption.scss'

const INBOX_BUTTON = 'Sort inbox'

const mapStateToProps = (state) => {
  const { emailList, isLoading } = state
  return { emailList, isLoading }
}

const SortInbox = ({ emailList, isLoading }) => {
  const history = useHistory()

  const startSort = () => {
    history.push(`/mail/${emailList[0].thread.id}`)
  }

  return (
    <div className="sort-container">
      <button className="sort-button" onClick={startSort} disabled={isLoading}>
        <p className="sort-item">{INBOX_BUTTON}</p>
      </button>
    </div>
  )
}

export default connect(mapStateToProps)(SortInbox)
