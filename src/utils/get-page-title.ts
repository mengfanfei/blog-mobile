
const title = '前端小萌'

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}
