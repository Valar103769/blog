const path = require('path');
const fs = require('fs');

module.exports = {
  base:'/blog/',
  title: 'Hello VuePress',
  description: 'Just playing around',
 
  head: [
    ['link', { rel: 'icon', href: '/logo.gif' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    // ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-icon-152x152.png' }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/ms-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
themeConfig: {
    repo: 'valar103769/blog',
    editLinks: true,
    smoothScroll: true,
    lastUpdated: '上次更新',
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
          '/library/Export2Excel',
          '/library/RichText',
          '/library/Recommend',
          '/library/Prismjs',
          '/library/Video'
            ] 
      },
      {
        title:'其他',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/else/移动端适配',

        ] 
      },
    ]
    
  },
  markdown:{
    extendMarkdown: md => {
      const examples = fs.readdirSync(path.resolve(__dirname, `./examples/`)).reduce((acc, example) => {
        let source = fs.readFileSync(path.resolve(__dirname, `./examples/${example}`)).toString();

        source = source.replace(/@vee-validate/g, 'vee-validate');

        acc[example.split('.').shift()] = md.render('```vue\n' + source + '\n```');

        return acc;
      }, {});

      md.use(require('markdown-it-custom-block'), {
        example(arg) {
          const source = examples[arg];

          return `
            <Example name="${arg}">
              <template #source>${source}</template>
            </Example>
          `;
        }
      });
    }
  },
  plugins:['@vuepress/pwa',{
    serverWorker:true,
    updatePopup:true
  }]
}

