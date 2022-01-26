import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {
  selectCurrentEmail,
  selectIsReplying,
  selectViewIndex,
  setCurrentEmail,
  setCurrentMessage,
  setIsReplying,
  setViewIndex,
} from '../../Store/emailDetailSlice'
import {
  selectInSearch,
  selectIsLoading,
  // selectIsSilentLoading,
  selectServiceUnavailable,
  setServiceUnavailable,
} from '../../Store/utilsSlice'
import { selectLabelIds, setCurrentLabels } from '../../Store/labelsSlice'
import {
  selectEmailList,
  selectCoreStatus,
  selectSearchList,
  storeSearchResults,
} from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import * as global from '../../constants/globalConstants'
import * as draft from '../../constants/draftConstants'
import * as GS from '../../styles/globalStyles'
import * as S from './EmailDetailStyles'
import FilesOverview from './Files/FilesOverview'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { IEmailListObject, IEmailListObjectSearch } from '../../Store/emailListTypes'
import EmailDetailHeader from './EmailDetailHeader'
import PreLoadMessages from './Messages/PreLoadMessages/PreLoadMessages'
import MessagesOverview from './Messages/MessagesOverview'
import { resetComposeEmail, selectComposeEmail } from '../../Store/composeSlice'
import {
  loadDraftList,
  resetDraftDetails,
  selectDraftListLoaded,
} from '../../Store/draftsSlice'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Baseloader from '../BaseLoader/BaseLoader'
import threadApi from '../../data/threadApi'

const EmailDetail = () => {
  const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const searchList = useAppSelector(selectSearchList)
  const isLoading = useAppSelector(selectIsLoading)
  // const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const draftListLoaded = useAppSelector(selectDraftListLoaded)
  const isReplying = useAppSelector(selectIsReplying)
  const viewIndex = useAppSelector(selectViewIndex)
  const coreStatus = useAppSelector(selectCoreStatus)
  const inSearch = useAppSelector(selectInSearch)
  const composeEmail = useAppSelector(selectComposeEmail)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [currentLocal, setCurrentLocal] = useState<string>('')
  const { messageId, overviewId } =
    useParams<{ messageId: string; overviewId: string }>()
  const [activeEmailList, setActiveEmailList] = useState<IEmailListObject | IEmailListObjectSearch>()
  const localLabels = useRef<string[] | string>([])
  const activePageTokenRef = useRef('')

  const cleanUpComposerAndDraft = () => {
    dispatch(resetComposeEmail())
    dispatch(resetDraftDetails())
  }

  const isReplyingListener = ({ messageIndex }: { messageIndex: number }) => {
    if (messageIndex > -1) {
      Object.keys(composeEmail).length > 0 && cleanUpComposerAndDraft()
      dispatch(setIsReplying(true))
      return
    }
    if (messageIndex === undefined) {
      Object.keys(composeEmail).length > 0 && cleanUpComposerAndDraft()
      dispatch(setIsReplying(false))
      return
    }
    if (activeEmailList && activeEmailList.threads.length > 0) {
      // This is used to specifically reply to a message.
      dispatch(
        setCurrentMessage(
          activeEmailList.threads[
          activeEmailList.threads.length - 1 - messageIndex
          ]
        )
      )
    }
  }

  const emailListIndex = useMemo(
    () =>
      emailList.findIndex(
        (threadList) =>
          threadList.labels && threadList.labels.includes(labelIds[0])
      ),
    [emailList, labelIds]
  )

  // TODO: Allow loading of the emailList when refreshing. The system should understand loading 1 single email on refresh is considered a search.
  const fetchEmailList = async () => {
    // if (!labelIds.includes(global.ARCHIVE_LABEL)) {
    //   const params = {
    //     labelIds,
    //     maxResults: 20,
    //   }
    //   dispatch(loadEmails(params))
    //   return
    // }
    if (location.pathname.includes(draft.DRAFT_LABEL) && !draftListLoaded) {
      dispatch(loadDraftList())
      return
    }
    // if (labelIds.includes(global.ARCHIVE_LABEL) && currentEmail) {
    const response = await threadApi().getThreadDetail(currentEmail)
    if (response) {
      const emailListObject = {
        threads: [response],
        nextPageToken: null,
      }
      dispatch(storeSearchResults(emailListObject))
    }
    // }
  }

  const fetchEmailDetails = () => {
    if (labelIds) {
      if (emailListIndex > -1) {
        const { nextPageToken } = emailList[emailListIndex]
        if (nextPageToken && activePageTokenRef.current !== nextPageToken) {
          activePageTokenRef.current = nextPageToken
          setActiveEmailList(emailList[emailListIndex])
        }
      }
      if (serviceUnavailable && serviceUnavailable.length > 0) {
        dispatch(setServiceUnavailable(''))
      }
    } else {
      dispatch(setServiceUnavailable(local.ERROR_EMAIL))
    }
  }

  // This will set the activeEmailList when first opening the email.
  // It will also update the activeEmailList whenever an email is archived or removed.
  useEffect(() => {
    if (
      activeEmailList &&
      activeEmailList.threads.length > 0 &&
      emailList &&
      emailList[emailListIndex]
    ) {
      setActiveEmailList(emailList[emailListIndex])
      return
    }
    if (searchList && emailListIndex === -1 && !inSearch) {
      setActiveEmailList(searchList)
    }
  }, [emailList, activeEmailList, searchList, emailListIndex, inSearch])

  // If the current email is found, set the id to the store. Otherwise attempt a fetch.
  useEffect(() => {
    if (currentEmail !== currentLocal) {
      if (activeEmailList) {
        setCurrentLocal(currentEmail)
        return
      }
      fetchEmailList()
    }
  }, [currentEmail, activeEmailList])

  // If after loading the emails the viewIndex is still -1, attempt a different load method
  useEffect(() => {
    if (
      !isLoading &&
      viewIndex === -1 &&
      currentLocal &&
      !labelIds.includes(global.ARCHIVE_LABEL)
    ) {
      const loadSpecificEmail = async () => {
        const response = await threadApi().getThreadDetail(currentLocal)
        if (response) {
          const emailListObject = {
            labels: labelIds,
            threads: [response.thread],
            nextPageToken: null,
          }
          dispatch(storeSearchResults(emailListObject))
        }
      }
      loadSpecificEmail()
    }
  }, [isLoading, viewIndex, currentLocal])

  // DetailNavigation will refetch emailList if empty.
  useEffect(() => {
    if (labelIds && labelIds === localLabels.current) {
      if (emailList.length > 0 && emailList[emailListIndex]) fetchEmailDetails()
    } else {
      const newLabelIds = [location.pathname.split('/')[2]]
      dispatch(setCurrentLabels(newLabelIds))
      localLabels.current = newLabelIds
      if (emailList.length > 0 && emailList[emailListIndex]) fetchEmailDetails()
    }
  }, [labelIds, emailList])

  useEffect(() => {
    if (messageId && currentEmail !== messageId) {
      dispatch(setCurrentEmail(messageId))
    }
  }, [messageId])

  useEffect(() => {
    if (isReplying && currentEmail && currentEmail !== messageId) {
      dispatch(setIsReplying(false))
    }
  }, [messageId])

  // If there is no viewIndex yet - set it by finding the index of the email.
  useEffect(() => {
    if (viewIndex === -1 && !isLoading && activeEmailList && activeEmailList.threads.length > 0) {
      dispatch(
        setViewIndex(
          activeEmailList.threads.findIndex(
            (item) => item.id === currentEmail
          )
        )
      )
    }
  }, [viewIndex, activeEmailList, currentEmail, isLoading])

  return activeEmailList ? (
    <>
      <EmailDetailHeader activeEmailList={activeEmailList} />
      <AnimatedMountUnmount>
        <S.Scroll clientState={Boolean(coreStatus)}>
          <GS.OuterContainer isReplying={isReplying}>
            {overviewId === local.MESSAGES &&
              activeEmailList.threads.length > 0 &&
              viewIndex > -1 && (
                <>
                  <MessagesOverview
                    threadDetail={activeEmailList.threads[viewIndex]}
                    isLoading={isLoading}
                    isReplying={isReplying}
                    isReplyingListener={isReplyingListener}
                    labelIds={labelIds}
                  />
                  <S.HiddenMessagesFeed>
                    <PreLoadMessages
                      threadDetailList={activeEmailList.threads}
                      viewIndex={viewIndex}
                    />
                  </S.HiddenMessagesFeed>
                </>
              )}
            {overviewId === local.FILES &&
              activeEmailList.threads.length > 0 && (
                <FilesOverview
                  threadDetail={activeEmailList.threads[viewIndex]}
                  isLoading={isLoading}
                />
              )}
          </GS.OuterContainer>
        </S.Scroll>
      </AnimatedMountUnmount>
    </>
  ) : (
    <Baseloader />
  )
}

export default EmailDetail
