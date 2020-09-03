# axios

axios在浏览器端使用时, 几乎完美; 但是在nodejs端做文件上传时,会遇到一些比较棘手的问题


讲到文件上传,就先讲一下几个http协议的东西, 
<br>
`content-type`  [mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 在请求头和响应头中都有; 在请求头中, 用于指定发送给后端的媒体类型, 
常用的有:
1.  `multipart/form-data` 
  这是文件上传必须的,

2. `application/json`
axios库默认的类型, HTTP通信中并不存在所谓的json，仅仅是JSON.stringify格式的字符串

3. `application/x-www-form-urlencoded`
jquery库默认的类型, 


Content-Type一般只存在于Post方法中，因为Get方法是不含“data”的，它的请求参数都会被编码到url后面，所以在Get方法中加Content-type是无用的。

一般而言, 发post请求时, 
<br>
如果需要`application/x-www-form-urlencoded`的格式, 需要手动设置`content-type`以及做new url.URLSearchParams({ foo: 'bar' })
<br>
如果需要`application/json`的格式, 需要手动设置`content-type`以及做JSON.stringify({ foo: 'bar' })
<br>
如果需要`multipart/form-data`的格式, 需要手动设置`content-type`以及做new FormData

对于axios, 在浏览器端, 我们仅仅格式化它的data就好了,`content-type`部分由axios内部设置;
而且它默认就是`application/json`的格式,我们也无需做JSON.stringify,
  
在node端, 使用`application/json`以及`application/x-www-form-urlencoded`时, 我们只需要格式化它的data, 而不需要显示设置content-type, 但是对于`multipart/form-data`, 除了格式化data, 还需要显示地设置content-type,
```js
const FormData = require('form-data');
 
const form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

axios.post('https://example.com', form, { headers: form.getHeaders() })
```

**无论什么运行环境, 当multipart/form-data时, 必须整个data就是一个formData**

浏览器端使用axios做文件上传测试demo,[codepen](https://codepen.io/valar123/pen/rNxRwKd)

```html
 <input type="file" id="file">
    <button onclick="submit()" >提交</button>
```

```js
function submit(e) {
  console.log("submit", axios);
  const file = document.querySelector("#file").files[0];
  let form = new FormData();
  form.append("file_name", file);

  axios.post("https://jsonplaceholder.typicode.com/posts", form).then((res) => {
    console.log(res.data);
  });
}
```


## 非常重要
先了解文件上传时  content-type  的结构

 content-type基本结构为: `<mimetype>`boundary分割线`各个append的内容描述
 <br>
 `multipart/form-data; boundary=----WebKitFormBoundary8oPx5RVGYpcB9ccM
 <br>

依然使用之前的代码, 这次再append两个额外的文本参数
```html
    <input type="file" id="file">
    <button onclick="submit()" >提交</button>
```
 ```js
   function submit(e){
const file = document.querySelector('#file').files[0]
let form = new FormData()
form.append('first',"first")
form.append('file_name',file)
form.append('end','endText')

axios.post('https://jsonplaceholder.typicode.com/posts',form).then(res =>{
  console.log(res.data)
})
  }
 ```

需要抓包才能看到详细的`conten-tpye`内容, 比如工具fiddler
不过,在node端, axios会开启本地服务器, 使用虚拟网卡, 导致fiddler无法抓到, 可以配置axios的proxy, 不过也比较折腾; 这里仅在firefox中查看一下浏览器端的文件上传即可了解

```js
axios.request({
  url: 'http://route.showapi.com/887-2',
  method: 'post',
  data: form,
  proxy: { host: '127.0.0.1', port: '8866' } // 随便声明一个未占用的端口,在fiddler中填上此port即可

})
```

在firefox浏览器中, 可以大致观察到如下结构:
```js
-----------------------------19443511042529610235636803144
Content-Disposition: form-data; name="first"

first
-----------------------------19443511042529610235636803144
Content-Disposition: form-data; name="file_name"; filename="C5AADF6C75B050C43ADA5BF92C37A92A.jpg"
Content-Type: image/jpeg
xxxx文件内容xxx
-----------------------------19443511042529610235636803144
Content-Disposition: form-data; name="end"

endText
-----------------------------19443511042529610235636803144--


```
 
 可以看到, 两条boundary线之间是文件参数,当文件参数是文件类型时,具有三个属性:`Content-Disposition`,`name`,`filename`, 
 name就是传到post时的字段名, filename估计是浏览器的原生FormData对象自动设置的

在node端, 使用axios官方文档的示例
```js
const FormData = require('form-data');
 
const form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

axios.post('https://example.com', form, { headers: form.getHeaders() })
```
抓包时,会发现, node这边会缺失my_file的filename属性, 这会导致后端接受不到正确的文件数据,
 这个时候需要手动指定, 使用form.append的第三个参数
 
 ```js
    const f = fs.createReadStream('./static/xxx.png')
      const fileName = v.substring(v.lastIndexOf('/') + 1, v.length)
      form.append(k, f, fileName)
 ```

 最后, 记录一个file转base64的代码
 ```js

 const mime = require('mime-types') 
   const f = fs.createReadStream('./static/xxx.png')
    const data = Buffer.from(f).toString('base64')
    const base64 = 'data:' + mime.lookup(v) + ';base64,' + data
 ```





