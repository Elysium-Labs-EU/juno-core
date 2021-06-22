import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import EmailList from '../EmailList'
import { fetchLabelIds, setCurrentLabels } from '../../Store/labelsSlice'

const mapStateToProps = (state) => {
  const { baseLoaded, storageLabels } = state
  return { baseLoaded, storageLabels }
}

const LABEL = 'Juno/To Do'

const Todo = ({ baseLoaded, storageLabels, dispatch }) => {
  useEffect(() => {
    if (baseLoaded && !storageLabels.some((label) => label.name === LABEL)) {
      dispatch(fetchLabelIds(LABEL))
    } else if (
      baseLoaded &&
      storageLabels.some((label) => label.name === LABEL)
    ) {
      const labelId = storageLabels.filter((label) => label.name === LABEL)
      dispatch(setCurrentLabels([labelId[0].id]))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default connect(mapStateToProps)(Todo)
