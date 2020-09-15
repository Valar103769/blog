# bug

```js
// jquery.min.js
// 直接在min.js文件最后加上
$.ajaxSetup({
    statusCode: {
        401: function(){
            if (window.Vue && Vue.prototype.$confirm){
                Vue.prototype.$alert("未登录或者登录已失效，请重新登录！", '错误', {
                    showClose: false
                }).then(()=>{
                    window.top.location.href = '/auth/login'
                })
            }else{
                window.alert('未登录或者登录已失效，请重新登录！')
                window.top.location.href = '/auth/login'
            }
        }
        //this will catch any and all access denied errors
    }
});

```
()=>, 在ie11下就会报错, 导致阻塞后面
