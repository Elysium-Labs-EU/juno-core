import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { selectLabelIds } from '../../Store/labelsSlice'
import * as S from './DetailNavigationStyles'
import { convertArrayToString } from '../../utils'
import {
  selectCurrentEmail,
  selectViewIndex,
  setViewingIndex,
} from '../../Store/emailDetailSlice'
import { loadEmails, selectMetaList } from '../../Store/metaListSlice'
import CloseMail from '../../utils/closeEmail'
import NavigateNextMail from '../../utils/navigateNextEmail'
import NavigatePreviousMail from '../../utils/navigatePreviousEmail'
import { CustomIconLink } from '../Elements/Buttons'

const DetailNavigation = () => {
  const metaList = useSelector(selectMetaList)
  const labelIds = useSelector(selectLabelIds)
  const currEmail = useSelector(selectCurrentEmail)
  const viewIndex = useSelector(selectViewIndex)

  const [currLocal, setCurrLocal] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const labelURL = convertArrayToString(labelIds)

  const metaListIndex = useMemo(
    () =>
      metaList.findIndex((threadList) =>
        threadList.labels.includes(...labelIds)
      ),
    [metaList, labelIds]
  )

  const isDisabledPrev = !!(
    metaList.length > 0 &&
    metaList[metaListIndex].threads[viewIndex - 1] === undefined
  )
  const isDisabledNext = !!(
    metaList.length > 0 &&
    metaList[metaListIndex].threads[viewIndex + 1] === undefined
  )

  const refetchMeta = () => {
    const params = {
      labelIds,
      maxResults: 20,
    }
    dispatch(loadEmails(params))
  }

  useEffect(() => {
    if (currEmail !== currLocal) {
      if (metaList.length > 0) {
        setCurrLocal(currEmail)
        const requestBody = {
          metaList: metaList[metaListIndex].threads,
          currEmail,
        }
        dispatch(setViewingIndex(requestBody))
      } else {
        refetchMeta()
      }
    }
  }, [currEmail, metaList])

  return (
    <S.Wrapper>
      <CustomIconLink
        className="button option-link"
        onClick={() =>
          NavigatePreviousMail({
            history,
            labelURL,
            metaListIndex,
            metaList,
            viewIndex,
          })
        }
        disabled={isDisabledPrev}
        icon={<FiChevronLeft size={20} />}
      />
      <CustomIconLink
        className="button option-link"
        onClick={() =>
          NavigateNextMail({
            history,
            labelURL,
            metaListIndex,
            metaList,
            viewIndex,
          })
        }
        disabled={isDisabledNext}
        icon={<FiChevronRight size={20} />}
      />
      <CustomIconLink
        className="button option-link"
        onClick={() => CloseMail({ history })}
        icon={<FiX size={20} />}
      />
    </S.Wrapper>
  )
}

export default DetailNavigation
