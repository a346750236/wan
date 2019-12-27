import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import Mybread from './common/mybread.vue'
import CoverImage from './publish/C-image'
import SelectImage from './publish/S-image'

import { quillEditor } from 'vue-quill-editor' // 引入了quill组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader) // 全局注册
    Vue.component('my-bread', Mybread) // 全局注册
    Vue.component('C-image', CoverImage) // 全局注册
    Vue.component('S-image', SelectImage) // 全局注册
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
  }
}
