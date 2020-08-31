import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Article from '../views/article/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/article'
  },
  {
    path: '/article',
    name: 'Article',
    component: Article,
    meta: {
      keepAlive: true,
      scrollTop: 0,
      hasTabbar: true,
      title: '文章'
    }
  },
  {
    path: '/folder',
    name: 'Folder',
    component: () => import('../views/folder/index.vue'),
    meta: {
      keepAlive: true,
      scrollTop: 0,
      hasTabbar: true,
      title: '分类'
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/detail/index.vue'),
    meta: {
      keepAlive: false,
      scrollTop: 0,
      hasTabbar: false,
      title: '文章详情'
    }
  },
  {
    path: '/articleList/:type',
    name: 'ArticleList',
    component: () => import('../views/articleList/index.vue'),
    meta: {
      keepAlive: false,
      scrollTop: 0,
      hasTabbar: false,
    },
    beforeEnter: (to, from, next) => {
      document.title = (to.params.type as string)
      next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
