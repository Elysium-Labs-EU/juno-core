import React, { useEffect, useMemo } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
import EmailListItem from '../EmailListItem/EmailListItem'
import {
  // loadDraftList,
  loadEmails,
} from '../../Store/metaListSlice'
import { loadDraftList } from '../../Store/draftsSlice'
import { selectEmailList } from '../../Store/emailListSlice'
import { selectLabelIds, selectLoadedInbox } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import Emptystate from '../Elements/EmptyState'
import LoadingState from '../Elements/LoadingState'
import * as local from '../../constants/emailListConstants'
import * as draft from '../../constants/draftConstants'
import { CustomButtonText } from '../Elements/Buttons'
import * as S from './EmailListStyles'
import * as GS from '../../styles/globalStyles'

const EmailList = () => {
  const emailList = useSelector(selectEmailList)
  const isLoading = useSelector(selectIsLoading)
  const labelIds = useSelector(selectLabelIds)
  const loadedInbox = useSelector(selectLoadedInbox)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      labelIds &&
      labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1)
    ) {
      const params = {
        labelIds,
        maxResults: local.MAX_RESULTS,
      }
      dispatch(loadEmails(params))
      if (labelIds.includes(draft.LABEL)) {
        dispatch(loadDraftList())
      }
    }
  }, [labelIds])

  const loadNextPage = (nextPageToken) => {
    if (labelIds && nextPageToken) {
      const params = {
        labelIds,
        nextPageToken,
        maxResults: local.MAX_RESULTS,
      }
      dispatch(loadEmails(params))
    }
  }

  // const filteredMetaList = useMemo(
  //   () =>
  //     metaList.filter((threadList) => threadList.labels.includes(...labelIds)),
  //   [metaList, labelIds]
  // )

  const renderEmailList = (filteredOnLabel) => {
    const { threads, nextPageToken } = filteredOnLabel && filteredOnLabel
    return (
      <>
        <S.Scroll>
          <GS.OuterContainer>
            <S.ThreadList>
              {threads.length > 0 && (
                <div className="base">
                  {threads.map((email) => (
                    <EmailListItem
                      key={email.id}
                      email={email}
                      // filteredMetaList={filteredMetaList}
                    />
                  ))}
                </div>
              )}
              {threads.length === 0 && <Emptystate />}
            </S.ThreadList>
            {nextPageToken ? (
              <S.LoadMoreContainer>
                {!isLoading && (
                  <CustomButtonText
                    className="button button-small button-light"
                    disabled={isLoading}
                    onClick={() => loadNextPage(nextPageToken)}
                    label={local.LOAD_OLDER}
                  />
                )}
                {isLoading && <CircularProgress />}
              </S.LoadMoreContainer>
            ) : (
              <S.LoadMoreContainer>
                <small className="text-muted">{local.NO_MORE_RESULTS}</small>
              </S.LoadMoreContainer>
            )}
          </GS.OuterContainer>
        </S.Scroll>
      </>
    )
  }

  const filteredOnLabel = useMemo(
    () =>
      emailList.filter((threadList) => threadList.labels.includes(...labelIds)),
    [emailList, labelIds]
  )

  const labeledInbox = () => {
    if (labelIds) {
      return renderEmailList(filteredOnLabel[0])
    }
    return null
  }

  return (
    <>
      {labelIds &&
        labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1) &&
        labeledInbox({ labelIds, emailList })}
      {isLoading &&
        labelIds &&
        labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1) && (
          <LoadingState />
        )}
    </>
  )
}

export default EmailList
