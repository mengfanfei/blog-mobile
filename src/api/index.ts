import request from '@/utils/request'

/**
 * 增加浏览次数
 * @param id 博客ID
 */
export function addView(id: string) {
  return request({
    url: '/blogs/addView',
    method: 'patch',
    data: { id }
  })
}

/**
 * 获取博客列表
 * @param {number} pageIndex 第几页
 * @param {number} pageSize 多少条
 */
export function getBlogsList({ pageIndex = 1, pageSize = 20, type }: { pageIndex?: number, pageSize?: number, type?: string }) {
  return request({
    url: '/blogs/getBlogsList',
    method: 'post',
    data: { pageIndex, pageSize, type, release: true }
  })
}

export function getCount() {
  return request({
    url: '/blogs/getCount',
    method: 'get'
  })
}

/**
 * 获取博客详情
 * @param {string} blogId 博客ID
 */
export function getBlogDetail(blogId: string) {
  return request({
    url: '/blogs/getBlogDetail',
    method: 'post',
    data: { blogId }
  })
}