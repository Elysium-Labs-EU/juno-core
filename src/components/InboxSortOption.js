import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './InboxSortOption.scss'
import { convertArrayToString, startSort } from '../utils'

const INBOX_BUTTON = 'Sort inbox'

const mapStateToProps = (state) => {
  const { emailList, labelIds, isLoading } = state
  return { emailList, labelIds, isLoading }
}

const SortInbox = ({ emailList, labelIds, isLoading }) => {
  const history = useHistory()
  const labelURL = convertArrayToString(labelIds)

  return (
    <div className="sort-container">
      <button
        className="sort-button"
        onClick={() => startSort(history, labelURL, emailList)}
        disabled={isLoading}
      >
        <p className="sort-item">{INBOX_BUTTON}</p>
      </button>
    </div>
  )
}

export default connect(mapStateToProps)(SortInbox)
