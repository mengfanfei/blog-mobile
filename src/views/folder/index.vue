<template>
  <div class="folder">
    <div v-for="item in folderList" :key="item.type" class="list-item" @click="search(item.type)">
      <div class="title">{{item.type}}</div>
      <div class="count">文章数量：{{item.count}}篇</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getCount } from '@/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Folder',
  setup() {
    const router = useRouter()
    let folderList = ref([])
    const getFolder = async () => {
      try {
        const result = await getCount()
        folderList.value = result.data
      } catch (error) {
        console.log(error)
      }
    }
    const search = (type: string) => {
      router.push(`/articleList/${type}`)
    }
    onMounted(() => {
      getFolder()
    })
    return {
      folderList,
      search
    }
  }
});
</script>

<style lang="scss" scoped>
.folder {
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
    .count {
      font-size: var(--text-small-size);
    }
  }
}
</style>
