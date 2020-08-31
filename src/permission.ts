import { useRouter } from 'vue-router'
import getPageTitle from './utils/get-page-title'

export function permission() {
  const router = useRouter()
  router.beforeEach(async(to, from, next) => {
    document.title = getPageTitle(to.meta.title)
    next()
  })
}
