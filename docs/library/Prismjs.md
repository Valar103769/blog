# prismjs

[prismjs](https://prismjs.com/)是一个使代码高亮的库, 这里介绍在vue中, 其npm包的使用方式,

下载安装

```bash
yarn add prismjs
yarn add babel-plugin-prismjs -D
```

使用方式

```js
// main.js
import 'prismjs/themes/prism.css'; // 如果只想使用默认主题,也可以不引入

// demo.vue 
import Prism from 'prismjs'
Prism.highlightAll()

```

 经测试,只使用`prismjs`, 只能高亮`javascript`, 不能高亮`java`,`php`,`pytho`n等语言,
需要引入` babel-plugin-prismjs`插件来解决这个问题, 

其实刚读文档看到这里的时候,我以为prismjs默认是支持高亮所有语言的, babel插件是用来做性能优化的, 其实测试下来并不是支持所有语言.

> To make it easy to configure your Prism instance with only the languages and plugins you need, use the babel plugin, babel-plugin-prismjs. This will allow you to load the minimum number of languages and plugins to satisfy your needs. See that plugin's documentation for configuration details.

安装及使用 [babel-plugin-prismjs](https://github.com/mAAdhaTTah/babel-plugin-prismjs)
```bash
// 因为只在webpack打包时使用,所以只需要安装到开发环境即可
yarn add babel-plugin-prismjs -D

// babel.config.js
{
  "plugins": [
    ["prismjs", {
        "languages": ["javascript", "css", "markup", "csharp"], // 声明需要高亮的语言,需要注意的是, 在[Supported languages](https://prismjs.com/#supported-languages)表里, 我们需要的是后面mark的文字, 比如csharp,而不是C#
        "plugins": ["line-numbers"], // 插件
        "theme": "twilight", // 主题
        "css": true // 使用主题时, 必须为true
    }]
  ]
}
```

## 注意点

这类操作dom的库, 在搭配vue使用时, 总是会遇到很多坑 🙁 , 
举例一个常规的代码:

```vue
<template>
<div>
  <pre>
    <code :class="className">
    {{code}}
    </code>
  </pre>

  <button @click="changeCode">changeCode</button>
</div>

</template>

<script>
export default {
  import Prism from 'prismjs'
  data(){
    className:'language-javascript'
    code:'const a = "a"'
  },
  methods:{
    changeCode(){
      
      this.code = 'const b = "b"'
      this.nextTick(()=>{
        Prism.highlightAll()
      })
    }
  }

}
</script>

```

以上代码, 点击changeCode按钮时, 并不会如期望的那样,实现code切换,  而是继续显示上一次的内容
,原因是: vue表面上是操作数据, 暗地里也是操作dom的, 而prismjs也是操作dom, 其会把`<code>`下的字符串替换为`<span class="token number"></span>`等标签, 这样就会破坏vue的管理, 合理的方式是使用$ref

```vue
<template>
<div>
  <pre><code :class="className" ref="codeContainer"></code></pre>
  <button @click="changeCode">changeCode</button>
</div>

</template>

<script>
export default {
  import Prism from 'prismjs'
  data(){
    className:'language-javascript'
    code:'const a = "a"'
  },
  methods:{
    changeCode(){
    
      this.code = 'const b = "b"'
      this.$refs['codeContainer'].textContent =  this.code 
      this.nextTick(()=>{
        Prism.highlightElement(this.$refs['codeContainer'])
      })
    }
  }

}
</script>

```
最后使用`textContent`,而不是`innerHTML`,或者`innerText`

不使用`innerHTML`, 是因为`innerHTML`,无法正确解析php语法,带有`/(^<|>$)/`的语言都不能正确解析; 

```php
  <?php
        header("Content-Type:text/html;charset=UTF-8");
  ?>
```

不使用`innerText`, 是因为`innerText`会让`this.code`里面的换行符丢失, 导致代码一行显示, 无法正确格式化, 尝试使用`JSON.stringify()`,保留换行符, 再使用`white-space:pre-wrap`,但是针对code是字符串内容,就不行; 
<br>
如果后端返回的是可以数组,对象等内容, 应该就可以使用这种方式了







