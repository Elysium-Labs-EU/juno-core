import EmailList from '../EmailList/EmailList'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import * as local from '../../constants/todoConstants'
import useSetCurrentLabel from '../../hooks/useSetCurrentLabel'

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
