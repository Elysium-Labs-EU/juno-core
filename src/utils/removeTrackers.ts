export default function removeTrackers(input: any): void {
  const TRACKERS_SELECTORS = [
    // TODO: Improve by looking at inline styles as well
    'img[width="0"]',
    'img[width="1"]',
    'img[height="0"]',
    'img[height="1"]',
    'img[src*="http://mailstat.us"]',
  ]

  const query = TRACKERS_SELECTORS.join(', ')
  console.log(input, query)

  //   $(query).each((_, el) => {
  //     $(el).remove()
  //   })
}
