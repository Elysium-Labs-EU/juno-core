import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import * as local from 'constants/todoConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const Todo = () => {
  useSetCurrentLabel()

  return (
    <>
      <Seo title={local.HEADER_TODO} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Todo
