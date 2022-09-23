import { Helmet } from 'react-helmet-async'

const APP_TITLE = 'Juno'

const Seo = ({
  title = undefined,
  // metaDescription = DEFAULT_META_DESC,
  ogTitle = undefined,
  // ogImage = DEFAULT_SHARE_IMAGE,
  ogDescription = undefined,
  ogUrl = undefined,
  ogType = 'website',
}: {
  title?: string
  // metaDescription?: string
  ogTitle?: string
  // ogImage?: string
  ogDescription?: string
  ogUrl?: string
  ogType?: string
}) => (
  <Helmet>
    <title>{`${`${title} - ${APP_TITLE}`}`}</title>
    {/* <meta name="description" content={metaDescription} /> */}
    <meta property="twitter:title" content={ogTitle} />
    <meta property="twitter:description" content={ogDescription} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:title" content={ogTitle} />
    {/* <meta property="og:image" content={ogImage} /> */}
    <meta property="og:description" content={ogDescription} />
    <meta property="og:url" content={ogUrl} />
    <meta property="og:type" content={ogType ?? 'website'} />
  </Helmet>
)

export default Seo
