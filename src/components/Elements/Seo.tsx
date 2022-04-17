const APP_TITLE = 'Juno'

const Seo = ({ title }: { title: string }) => (
  <title>{`${`${title} - ${APP_TITLE}`}`}</title>
)

export default Seo
