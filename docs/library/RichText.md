# 富文本编辑器 & markdown

富文本, 使用过tinymce, 试用过quill.
 - quill: 研究了下vue版本. api简单, 但图片上传需要第三方插件, 目前只有只有一个且插件库已不更新, 另外百度到的使用方式五花八门. 自己配置图片上传不太方便,
 ;另外工具栏没有tooltip,且是英文, 汉化的方式是:官方提供插槽,自己提供DOMString,绑定相应事件, 很麻烦,图片上传库占用了官方的插槽,再想在这基础上汉化, 更加难了. 
 
tinymce: 安装引用困难. 有js版本和vue版本, vue版本有个坑, 平时封装vue版本时,都是把需要的插件都封装进去, 但是tinymce-vue仅仅是残废版. 
什么意思呢, 就是说仅仅`import tinymce-vue from '@tinymce/tinymce-vue'` 可以用,但是tinymce的插件没有给你下载到本地,而是使用指向官方的cdn的方式`https://cdn.tiny.cloud/1/9fwvocgg1gn6abohv6ipx9l5k002zd4qzary0o3tb71rxnls/tinymce/5.3.2-85/plugins/autosave/plugin.min.js
`, 该cdn在国内特别卡, 即使是内部系统使用, 加载也特别慢,
正常的用法就是, 再下载tinymce到本地, 然后按需import 你需要的插件,并自己解决插件之间的依赖关系,就像单独使用tinymce一样, 还需要把汉化包, 皮肤包移动到public目录. 麻烦的一笔,不过也没找到比较好的使用方法 


另外 markdown的话,使用过[editor.md](https://github.com/pandao/editor.md),官方没提供vue版本. 自己封装时, 在编辑和渲染时, 处理方式不一致, 获取值时需要自己阅读文档, 手动插入,  最困难的是, 扩展他的工具栏时, 依赖关系不明确, 一下差这个一下差那个. 非常不推荐

```js
// 当初的调试代码如下, 真的不是一般的折腾人 
    import '../../../../editor.md/css/editormd.min.css'
     // import '../../../../editor.md/lib/marked.min.js'
     import '../../../../editor.md/lib/prettify.min.js'
     // import '../../../../editor.md/lib/underscore.min.js'
     // import '../../../../editor.md/editormd.min.js'

     // require('editor.md/lib/raphael.min.js')
     // import 'editor.md/lib/flowchart.min.js'
        // require('../../../../editor.md/lib/flowchart.min.js')

     window.marked=require('editor.md/lib/marked.min.js')
     // require('editor.md/lib/prettify.min.js')
        // import 'editor.md/lib/underscore.min.js'
     // import 'editor.md/lib/sequence-diagram.min.js'
     // window.CodeMirror=require('editor.md/lib/codemirror/codemirror.min.js')
     //  let dd=window.editormd=require('editor.md/editormd')()
     // console.info(window.marked)
```


 @tinymce/tinymce-vue


```vue
<template>
  <div>
    <div :style="{width:width,height:height}"
         v-if="loading"
         v-loading="loading"
         element-loading-text="正在初始化编辑器..."
         element-loading-spinner="el-icon-loading">
    </div>

    <editor :init="init" v-bind="$attrs" v-on="$listeners"
            api-key="9fwvocgg1gn6abohv6ipx9l5k002zd4qzary0o3tb71rxnls"></editor>
  </div>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  import plugins from './plugins'
  import toolbar from './toolbar'

  const init = {
    language: 'zh_CN',
    body_class: 'panel-body ',
    object_resizing: false,
    toolbar: toolbar,
    menubar: 'file edit insert view format table',
    plugins: plugins,
    end_container_on_empty_block: true,
    code_dialog_height: 450,
    code_dialog_width: 1000,
    advlist_bullet_styles: 'square',
    advlist_number_styles: 'default',
    // imagetools_cors_hosts: ['www.showapi.com'],
    default_link_target: '_blank',
    link_title: false,
    nonbreaking_force_tab: true, // 默认情况下, 在内部使用tab键,响应的作用域是window
    paste_data_images: true,
    images_upload_url: 'https://jsonplaceholder.typicode.com/posts/',
    images_upload_base_path: '/demo',
  }
  export default {
    name: "Tinymce",
    components: {
      Editor
    },
    props: {
      height: {
        type: [String, Number],
        required: false,
        default: 360
      },
      width: {
        type: [Number, String],
        required: false,
        default: 'auto'
      },
    },
    data() {
      return {
        init: {
          ...init,
          height: this.height,
          init_instance_callback: editor => {
            this.loading = false
            console.log('show', this)
            editor.on('change keyup undo redo', () => {
              this.$emit('update:summary', editor.getContent({format: 'text'}).slice(0, 150))
            })
          },

        },
        loading: true
      }
    },
    methods:{
          getImgs(){
       return Array.from(window.tinymce.get(this.tinymceId).getDoc().querySelectorAll('img')).reduce((accu, curr)=>{
         const src = new URL(curr.src).pathname.slice(1)
         accu.push(src)
          return accu
        },[])
      },
    }
  }
</script>

<style scoped>

</style>

```
