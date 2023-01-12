import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import {HEADER_TODO} from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const Todo = () => {
  useSetCurrentLabel()

  return (
    <>
      <Seo title={HEADER_TODO} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Todo
