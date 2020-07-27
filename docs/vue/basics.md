# Basics

 - watch
 与data的默认值,将不会触发回调, 做子组件时, v-if创建时,通过prop初始值传入还是父组件默认时,都需要immediate触发
```vue
<script>
export default{
  data(){
    return {
radio:1 
    },
  }
  watch:{
    radio(val){
          if(val === 1){
            this.refundForm.money =  this.remainMoney
          }
          if(val === 2){
            this.refundForm.money = this.realPayMoney
          }
          if(val === 3){
            this.refundForm.money =  this.customMoney
          }
        }
  }
}
</script>
     
```
