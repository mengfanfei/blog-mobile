<template>
  <div class="article">
    <div v-for="item in list" :key="item.blogId" class="list-item" @click="toDetail(item.blogId)">
      <div class="title">{{item.title}}</div>
      <div class="summary">{{item.summary}}</div>
      <div class="time">{{formatTime(item.update_time)}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, onActivated } from 'vue'
import { useRouter, onBeforeRouteLeave, useRoute } from 'vue-router'
import { getBlogsList } from '@/api'
import { formatTime } from '@/utils'

export default defineComponent({
  name: 'Article',
  setup(props, context) {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      pageIndex: 1,
      pageSize: 1000,
      list: []
    })
    const getList = async () => {
      const result = await getBlogsList({ pageIndex: state.pageIndex, pageSize: state.pageSize })
      state.list = result.data
    }
    const toDetail = (id: number) => {
      router.push(`/detail/${id}`)
    }
    // 设置位置不变
    const setScrollTop = () => {
      document.documentElement.scrollTop = route.meta.scrollTop
      document.body.scrollTop = route.meta.scrollTop
    }

    onActivated(() => {
      setScrollTop()
    })
    onBeforeRouteLeave((to, from, next) => {
      from.meta.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      next()
    })
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state),
      toDetail,
      formatTime
    }
  }
});
</script>

<style lang="scss" scoped>
.article {
  padding: 0 0.3rem;
  .list-item {
    padding: 0.3rem 0 0.2rem 0;
    color: var(--text-sub-color, #a2a2a2);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #eeeeee;
    .title {
      color: var(--text-color, #282828);
      font-weight: 700;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin-bottom: 0.2rem;
      font-size: var(--text-size);
    }
    .summary {
      color: var(--text-sub-color);
      font-size: var(--text-middle-size);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      margin-bottom: 0.2rem;
    }
    .time {
      font-size: var(--text-small-size);
    }
  }
}
</style>
