import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { push } from 'redux-first-history'
import {
  selectCurrentEmail,
  selectIsForwarding,
  selectIsReplying,
  selectViewIndex,
  setCurrentEmail,
  setIsForwarding,
  setIsReplying,
  setViewIndex,
} from '../../Store/emailDetailSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import { selectLabelIds } from '../../Store/labelsSlice'
import {
  selectEmailList,
  selectCoreStatus,
  selectSearchList,
  selectActiveEmailListIndex,
} from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import * as global from '../../constants/globalConstants'
import * as GS from '../../styles/globalStyles'
import * as S from './EmailDetailStyles'
import FilesOverview from './Files/FilesOverview'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import {
  IEmailListObject,
  IEmailListObjectSearch,
} from '../../Store/emailListTypes'
import EmailDetailHeader from './EmailDetailHeader'
import PreLoadMessages from './Messages/PreLoadMessages/PreLoadMessages'
import MessagesOverview from './Messages/MessagesOverview'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Baseloader from '../BaseLoader/BaseLoader'
import Seo from '../Elements/Seo'

const EmailDetail = () => {
  const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const searchList = useAppSelector(selectSearchList)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  const viewIndex = useAppSelector(selectViewIndex)
  const coreStatus = useAppSelector(selectCoreStatus)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const dispatch = useAppDispatch()
  const [baseState, setBaseState] = useState('idle')
  const [currentLocal, setCurrentLocal] = useState<string>('')
  const { threadId, overviewId } =
    useParams<{ threadId: string; overviewId: string }>()
  const [activeEmailList, setActiveEmailList] = useState<
    IEmailListObject | IEmailListObjectSearch
  >()

  // This will set the activeEmailList when first opening the email.
  // It will also update the activeEmailList whenever an email is archived or removed.
  useEffect(() => {
    setBaseState('loaded')
    if (coreStatus === global.CORE_STATUS_SEARCHING && searchList) {
      setActiveEmailList(searchList)
    } else if (emailList && emailList[activeEmailListIndex]) {
      setActiveEmailList(emailList[activeEmailListIndex])
    }
  }, [emailList, activeEmailListIndex, searchList])

  // If the current email is found, set the id to the store. Otherwise reroute user to homepage.
  useEffect(() => {
    if (currentEmail !== currentLocal && baseState === 'loaded') {
      if (activeEmailList) {
        setCurrentLocal(currentEmail)
      } else {
        dispatch(push('/'))
      }
    }
  }, [currentEmail, activeEmailList, baseState])

  // If the found threadId doesn't match with the Redux version - it will set it.
  useEffect(() => {
    if (threadId && currentEmail !== threadId) {
      dispatch(setCurrentEmail(threadId))
    }
  }, [threadId])

  useEffect(() => {
    if (isReplying && currentEmail && currentEmail !== threadId) {
      dispatch(setIsReplying(false))
    }
    if (isForwarding && currentEmail && currentEmail !== threadId) {
      dispatch(setIsForwarding(false))
    }
    return () => {
      if (isForwarding) {
        dispatch(setIsForwarding(false))
      }
      if (isReplying) {
        dispatch(setIsReplying(false))
      }
    }
  }, [threadId])

  // If there is no viewIndex yet - set it by finding the index of the email.
  useEffect(() => {
    if (
      viewIndex === -1 &&
      !isLoading &&
      activeEmailList &&
      activeEmailList.threads.length > 0
    ) {
      dispatch(
        setViewIndex(
          activeEmailList.threads.findIndex((item) => item.id === currentEmail)
        )
      )
    }
  }, [viewIndex, activeEmailList, currentEmail, isLoading])

  return activeEmailList ? (
    <>
      <EmailDetailHeader activeEmailList={activeEmailList} />
      <AnimatedMountUnmount>
        <S.Scroll clientState={Boolean(coreStatus)}>
          <GS.OuterContainer tabbedView={isReplying || isForwarding}>
            {overviewId === local.MESSAGES &&
              activeEmailList.threads.length > 0 &&
              viewIndex > -1 && (
                <>
                  <MessagesOverview
                    threadDetail={activeEmailList.threads[viewIndex]}
                    isLoading={isLoading}
                    isReplying={isReplying}
                    isForwarding={isForwarding}
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
