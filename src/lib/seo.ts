const SITE_URL = 'https://indiancalculatorhub.netlify.app'
const SITE_NAME = 'Indian Calculator Hub'

export function pageHead({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  const url = `${SITE_URL}${path}`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

export { SITE_URL, SITE_NAME }
