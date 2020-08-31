<template>
  <div id="app">
    <router-view v-slot='{ Component }'>
      <keep-alive :include="['Article', 'Folder', 'ArticleList']">
        <component :is="Component" :key="route.fullPath"/>
      </keep-alive>
    </router-view>
    <tabbar v-show="route.meta.hasTabbar"></tabbar>
  </div>
</template>

<script lang='ts'>
import { defineComponent, KeepAlive } from 'vue'
import Tabbar from './components/common/tabbar/index.vue'
import { useRoute } from 'vue-router'
import { permission } from './permission'
export default defineComponent({
  name: 'App',
  components: {
    Tabbar,
  },
  setup() {
    const route = useRoute()
    permission()
    return {
      route
    }
  }
})
</script>

<style lang="scss">
:root {
  --text-color: #282828;
  --text-sub-color: #a2a2a2;
  --bgColor: #ffffff;
  --text-size: 0.32rem;
  --text-big-size: 0.36rem;
  --text-middle-size: 0.28rem;
  --text-small-size: 0.24rem;
  --text-mini-size: 0.20rem;
}
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #ffffff;
    --bgColor: #444444;
  }
}
html {
  font-size: 13.333333vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  font-size: 0.32rem;
  background: var(--bgColor, #ffffff);
  color: var(--text-color, #282828);
}
</style>
