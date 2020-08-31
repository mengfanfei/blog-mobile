<template>
  <div>
    <div class="tab-bar">
      <div class="tab-bar-border"></div>
      <div v-for="(item, index) in list" :key="item.text" class="tab-bar-item" @click="change(item.pagePath)">
        <img :src="selected === index ? item.selectedIcon : item.icon" class="tabbar-img"/>
        <div class="text" :style="{color: selected === index ? selectedColor : color}">{{item.text}}</div>
      </div>
    </div>
    <div class="placeholder"></div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch, watchEffect, onMounted } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Tabbar',
  setup() {
    const route = useRoute()
    const state = reactive({
      selected: 0,
      color: '#707070',
      selectedColor: '#1296db',
      list: [
        {
          pagePath: '/article',
          text: '文章',
          icon: require('../../../assets/img/article.png'),
          selectedIcon: require('../../../assets/img/article-select.png')
        },
        {
          pagePath: '/folder',
          text: '分类',
          icon: require('../../../assets/img/folder.png'),
          selectedIcon: require('../../../assets/img/folder-select.png')
        }
      ]
    })

    const change = (path: string) => {
      router.replace(path)
    }

    watchEffect(() => {
      if (route.path !== '/') {
        const index = state.list.findIndex(item => {
          return item.pagePath === route.matched[0].path || item.pagePath === route.path
        })
        state.selected = index
      } else {
        state.selected = 0
      }
    })

    // watch(
    //   route,
    //   (route) => {
    //     console.log(route.path)
    //     // const index = state.list.findIndex(item => {
    //     //   return item.pagePath === route.matched[0].path || item.pagePath === route.path
    //     // })
    //     // state.selected = index
    //   }
    // )

    return {
      ...toRefs(state),
      change
    }
  }
  // watch: {
  //   $route: {
  //     handler(to, from) {
  //       const index = this.list.findIndex(item => {
  //         if (!to.matched[0]) {
  //           to.matched[0] = {}
  //         }
  //         return item.pagePath === to.matched[0].path || item.pagePath === to.path
  //       })
  //       this.selected = index
  //     },
  //     immediate: true
  //   }
  // },
})
</script>

<style lang="scss" scoped>
.placeholder {
  height: 50px;
  width: 100vw;
}
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: #ffffff;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 1000;
}
.tab-bar-border {
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.16);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}
.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
}
.tab-bar-item .tabbar-img {
  width: 20px;
  height: 20px;
  margin-bottom: 4px;
}

.tab-bar-item .text {
  font-size: 10px;
}

@media (prefers-color-scheme: dark) {
  .tab-bar {
    background: #444;
  }
}
</style>