import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './InboxSortOption.scss'
import { CustomButtonText, CustomIconLink } from '../../components/Elements'
import { convertArrayToString, startSort } from '../../utils'
import { MdRefresh } from 'react-icons/md'
import { refreshEmailFeed } from './../../Store/actions'

const INBOX_BUTTON = 'Sort inbox'

const mapStateToProps = (state) => {
  const { metaList, emailList, labelIds, isLoading } = state
  return { metaList, emailList, labelIds, isLoading }
}

const SortInbox = ({ metaList, emailList, labelIds, isLoading, dispatch }) => {
  const history = useHistory()
  const labelURL = convertArrayToString(labelIds)

  const refreshFeed = () => {
    const params = {
      labelIds: labelIds,
      maxResults: 100,
    }
    dispatch(refreshEmailFeed(params, metaList))
  }

  return (
    <div className="sort-container">
      <CustomIconLink
        className="btn btn-light"
        onClick={() => refreshFeed()}
        disabled={isLoading}
        icon={<MdRefresh />}
      />
      <CustomButtonText
        className="sort-button"
        onClick={() => startSort(history, labelURL, emailList)}
        disabled={isLoading}
        label={INBOX_BUTTON}
      />
    </div>
  )
}

export default connect(mapStateToProps)(SortInbox)
