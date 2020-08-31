# vue3_ts

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 使用normalize.css初始化样式
```js
npm install normalize.css
// 在main.ts中引入
import 'normalize.css'
```
### 使用vw+rem实现移动端适配
```css
750的设计稿  
html {
    font-size: 13.33333333vw;    （100px）
}
375的设计稿
html {
    font-size: 26.66666666vw;    (100px)
}
然后在写样式时使用rem单位，比如：
div {
    font-size: 0.16rem;   (16px, 375设计稿)
    font-size: 0.32rem;   (16px, 750设计稿)
    width: 1rem;   (100px, 26.666666vw   375设计稿)
}
```

### 使用css变量和媒体查询处理暗黑模式

```css
:root {
  --text-color: #282828;
  --bgColor: #ffffff;
}
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #ffffff;
    --bgColor: #444444;
  }
}
```

### 移动端的安全距离，点击延迟, 使用rem+viewport 解决1px问题


### 封装tabbar组件，并通过router的meta控制页面是否缓存，是否存在tabbar，是否需要固定页面的位置，细节见app.vue和components/common/tabbar 下的文件, 以及通过监听路由设置当前tab


### 通过在路由 meta中添加title字段, 以及在路由中使用beforeEnter 动态修改标题

### 封装axios

### 使用keep-alive缓存页面，通过include设置那些页面需要缓存，以及通过key值防止同一个页面不同参数不刷新问题
```HTML
<router-view v-slot='{ Component }'>
      <keep-alive :include="['Article', 'Folder', 'ArticleList']">
    <component :is="Component" :key="route.fullPath"/>
  </keep-alive>
</router-view>
```