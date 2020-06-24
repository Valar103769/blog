# sortableJS

## el-table的拖拽排序

  毋庸置疑,使用[sortablejs](https://github.com/SortableJS/Sortable), 官方也提供了vue版本,[Vue.Draggable](https://github.com/SortableJS/Vue.Draggable),

  本来是想用vueDraggable的, 但是看了下文档, 貌似只能使用darggable做容器, 那么就不能使用el-table了, 与elementui不相容, 遂放弃

  ```js
  <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
  </draggable>
  ```

  从文档可以看出, sortablejs实例化时, 需要传入$refs. 对于vue而言,就是说需要mounted生命周期完成

  实践下来,大致上有三个注意点:

  - **请求数据**: 在mounted之后才有$ref的引用, 所以尽量在mounted中请求后台数据,
  - **$nextTick**: 如果需要在数据变更之后操作dom的,需要使用$nextTick,
  - **绑定key**: 为每个item设置唯一值, el-table的`row-key="id"`

### 请求数据

实际项目中请求数据的方法是一个通用方法, 其在created生命周期里调用. 所以当数据来临的时候,组件可能并没有mounted, 

解决方法: 
  1. 修改通用方法,使其在mounted里调用接口, 如果项目不复杂且dom操作多也可以这样做
   -  可能产生未知错误
  - created比mounted快一些

  2. 找一个既mounted又ajax完成的时机! 比如可以watch一个变量, mounted和ajax完成时, 修改它. 因为此处仅有一个ajax,所以也可以在mouned和ajax完成时的回调里都实例化sortablejs, 必中一个

  ```js
  import {setSort} from '~/utils/dragable'

  fetch().then(()=>{
    if (this.$refs.dragTable) {
      // 稍微封装了一下sortablejs. 为了在sortablejs中读取到组件数据, 所以使用call传入this.最后发现无法公用,哈哈
      setSort.call(this) 
    }
  })

  mounted() {
    if (this.list.length) {
        setSort.call(this)
    }
  },
  ```


### $nextTick
```js{16}
import Sortable from 'sortablejs'

const setSort = function (list, el1) {
    const el = el1 || this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        handle: ".drag",
        setData: function (dataTransfer) {
            dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
            console.log('end', evt)
            list = this.list // 在onEnd之后获取列表数据,而不是在外面

            const targetRow = list.splice(evt.oldIndex, 1)[0]
            this.$nextTick(() => { // 因为使用到了dom属性:evt.newIndex,所以必须使用$nextTick
                list.splice(evt.newIndex, 0, targetRow) // element's new index within new parent
                this.list = list.map((item, idx) => (item.cfg.sort = idx, item))
            })
        }
    })
}
export {
    setSort
}

```

@[example](table)
