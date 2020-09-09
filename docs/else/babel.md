# babel-polyfill

 polyfill种类很多, 常见的有: es新语法(箭头函数),html新标签(dialog), bom新api(IntersectionObserver), es新api
 (Promise), 安装到`devDependencies`还是`dependencies` ? 
 <br/>,
 对于es新语法,只针对编译阶段, 理应安装到`devDependencies`, 
 而其他种类, 需要注册到运行环境的prototype, 所以需要安装到`dependencies`.

1. `babel`,编译时可以操作AST, 以支持es新语法, `babel-polyfill` 不是导入真正的`polyfill`,而是一个判断函数,判断源代码里是否使用了最新的api, 如果有就去`npm i xxxpolyfill`  , 因此`babel-polyfill`下载到`devDependencies`

eg. `IntersectionObserver` api, 属于bom api, 是没有被babel支持的, 需要手动引入IntersectionObserver的polyfill库,
测试的方式是, 被`babel-polyfill`支持的api,是会挂载到window上的, 可以在浏览器console面板打印出来,比如ie11不支持Promise,但是在使用了babel的项目里, 是可以打印出Promsie的, 由此可以测试`IntersectionObserver`不被babel支持


2.  vuecli下的[polyfill](https://cli.vuejs.org/zh/guide/browser-compatibility.html#usebuiltins-usage)工作模式, 

>  一个默认的 Vue CLI 项目会使用 @vue/babel-preset-app，它通过 @babel/preset-env 和 browserslist 配置来决定项目需要的 polyfill。

默认情况下，它会把 useBuiltIns: 'usage' 传递给 @babel/preset-env，这样它会根据源代码中出现的语言特性自动检测需要的 polyfill。

```js
// babel.config.js
module.exports = {
  presets: [
    '@vue/app'
  ],

}

 // 等同于

 module.exports = {
 "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
         "targets":{} // targets和 browserslist必须配置一个, 没有默认值, 需要显示写 { "targets": "defaults" }
      }
    ]
  ]

}
```

## 优化polyfill

 一般来说, 每一个`polyfill`都是下载到`dependencies`, 会导致在支持的浏览器下,也会打包不需要的polyfill文件, 优化的方式是:


