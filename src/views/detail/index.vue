<template>
  <div class="detail">
    <h2 class="title">{{blogDetail.title}}</h2>
    <div class="sub" v-if="blogDetail.update_time">
      <span style="margin-right: 0.2rem;">{{formatTime(blogDetail.update_time)}}</span>
      <span>阅读 {{blogDetail.view_number}}</span>
    </div>
    <div v-html="blogDetail.content_html"></div>
  </div>
</template>

<script lang='ts'>
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { addView, getBlogDetail } from '@/api'
import { formatTime } from '@/utils'

async function highlightHandle() {
  await hljs
  let highlight = document.querySelectorAll('code,pre')
  highlight.forEach((block: any) => {
    hljs.highlightBlock(block)
  })
}
highlightHandle()
export default {
  name: 'Detail',
  setup() {
    const route = useRoute()
    const blogId = (route.params.id) as string
    const state = reactive({
      blogDetail: {}
    })
    const getDetail = async () => {
      try {
        const result = await getBlogDetail(blogId)
        state.blogDetail = result.data
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      addView(blogId)
      getDetail()
    })

    return {
      ...toRefs(state),
      formatTime
    }
  }
}
</script>
<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 0.2rem;
  box-sizing: border-box;
  word-break: break-all;
  .sub {
    color: var(--text-sub-color);
  }
}
</style>