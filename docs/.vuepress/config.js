module.exports = {
  base:'/blog/',
  title: 'Hello VuePress',
  description: 'Just playing around',

  head: [
    ['link', { rel: 'icon', href: '/logo.gif' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  ],
themeConfig: {
    repo: 'valar103769/blog',
    editLinks: true,
    smoothScroll: true,
    locales: {
      '/': {
        selectText: '选择语言',
        label: '简体中文',
        ariaLabel: 'Languages',
        editLinkText: '在 Github 上编辑此页',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
          }
        },
        algolia: {},
        nav: [
          { 
            text: '技术',  
            items: [
              { text: 'vue', link:'/vue/basics' },
              { text: '第三方库', link:'/library/sortableJS' }
            ]
        },
          { text: '生活', link: '/life/docs' }
        ],
        sidebarDepth: 2,
        sidebar:[
          {
            title:'vue',
            collapsable: false,
            sidebarDepth: 2,
            children: [
              '/vue/basics',
          
            ] 
          },
          {
            title:'第三方库',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/library/sortableJS',
          
            ] 
          },
          {
            title:'其他',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/else/phone',
          
            ] 
          },
        ]
      },
    }
  }
}
