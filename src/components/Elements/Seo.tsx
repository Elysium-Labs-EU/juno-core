import { Helmet } from 'react-helmet-async'

const APP_TITLE = 'Juno'

const Seo = ({ title }: { title: string }) => (
  <Helmet>
    <title>{`${`${title} - ${APP_TITLE}`}`}</title>
  </Helmet>
)

export default Seo
