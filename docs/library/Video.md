# 视频文件/图片等文件下载预览

使用 `<a download></a>`, 两个限制, 不能跨域, 需要浏览器不能预览的href地址,比如blobURL, dataURL,
blob相对要简短一下, 推荐使用, 比如youtube所使用的就是blob
blob格式是: ``` blob:<origin>/<uuid>```

参考图片预览: 把远程图片加载到canvas里, 使用canvas的toBlob api转成下载地址, 
下载视频到本地内存再转blob,用户再下载, 就导致下载两次, 视频文件大的话可能还有问题, 因此让后端直接提供blob地址即可

[本地图片上传预览以及下载](https://codepen.io/valar123/pen/oNbVoym)


