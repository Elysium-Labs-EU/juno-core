import Layout from 'components/Layout/Layout'
import * as local from 'constants/composeEmailConstants'
import * as global from 'constants/globalConstants'
import Composer from './Composer'

const ComposeEmail = () => (
  <Layout
    headerTitle={local.COMPOSE}
    activePage={global.ACTIVE_PAGE_HEADER.compose}
  >
    <Composer />
  </Layout>
)

export default ComposeEmail