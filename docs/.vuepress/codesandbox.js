import {getParameters} from 'codesandbox/lib/api/define'

const PACKAGE_JSON = {
  "name":"codesandbox",
  "version":"0.1.0",
  "private":true,
  "script":{
    "server":"vue-cli-service server",
    "build":"vue-cli-service build",
    "lint":"vue-cli-service lint"
  },
  "dependencies":{
    "vue":"2.6.11",
  },
  "devDependencies":{
    "@vue/cli-plugin-babel":"3.6.0",
    "@vue/cli-plugin-eslint":"3.6.0",
    "@vue/cli-service":"3.6.0",
    "babel-eslint":"^10.0.1",
    "eslint":"^5.8.0",
    "eslint-plugin-vue":"^5.0.0",
    "vue-template-compiler":"^2.5.21"
  },
  "eslintConfig":{
    "root":true,
    "env":{
      "node":true
    },
    "extend":[
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules":{},
    "parserOptions":{
      "parser":"babel-eslint"
    }
  },
  "postcss":{
    "plugins":{
      "autoprefixer":{}
    }
  },
  "browserslist":[
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}

const SANDBOX_CONFIG_JSON = {
  tempalte:'vue-cli'
}

export function makeExample(source){
  return getParameters({
    files:{
      "src/Demo.vue":{
        content:source
      },
      "src/App.vue":{
        content:`
        <template><Demo /></template>
        <script>
          import Demo from './Demo'

          export default {
            components: {
              Demo
            }
          }
        </script>
        `
      },
      "src/main.js":{
        content:`
        import Vue from 'vue'
        // import ElementUI from 'element-ui'
        // import 'element-ui/lib/theme-chalk/index.css'
        import App from "./App.vue"

        // Vue.use(ElementUI)
        Vue.config.productionTip = false

        new Vue({
          el:'#app',
          render:h => h(App)
        })

        `
      },
      "package.json":{
        content:PACKAGE_JSON
      },
      "sandbox.config.json":{
        content:JSON.stringify(SANDBOX_CONFIG_JSON, null, 2)
      }
    }
  })
}
