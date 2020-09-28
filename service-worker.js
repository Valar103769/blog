/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "95467736353f7d17e4a0033a5d629897"
  },
  {
    "url": "assets/css/0.styles.fca5f8e5.css",
    "revision": "617bc16f89d7925209c317603d8962ef"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.3f44c485.js",
    "revision": "36ccb9d0b38f065bf9f504a60c49805d"
  },
  {
    "url": "assets/js/11.e628e3d3.js",
    "revision": "8302ffce693cba954a564e311ee38e5c"
  },
  {
    "url": "assets/js/12.ef95597b.js",
    "revision": "dda03f1009313625de5c89b5c29865f5"
  },
  {
    "url": "assets/js/13.c51c1b8f.js",
    "revision": "613204fa270c9008836b14cee4152d87"
  },
  {
    "url": "assets/js/14.7e20a768.js",
    "revision": "87b08a41340955b55b8531c24c3aa630"
  },
  {
    "url": "assets/js/15.7cee4465.js",
    "revision": "b16b081440bfdeab951e97c8bd8c0c56"
  },
  {
    "url": "assets/js/16.a4a43103.js",
    "revision": "e597a5092f0e7b149c1e3a4f2ad60efc"
  },
  {
    "url": "assets/js/17.828efafa.js",
    "revision": "de2e5c4c05fd9d21f38e236c275ed095"
  },
  {
    "url": "assets/js/18.fd0d3939.js",
    "revision": "1a3d26a0426bad94fed669b1800a7ef4"
  },
  {
    "url": "assets/js/19.01b5b3b5.js",
    "revision": "5b0e82144b55f582bda417a75d133eaa"
  },
  {
    "url": "assets/js/2.c767b770.js",
    "revision": "d86f41755f9cf1286ffdf209d2f643e0"
  },
  {
    "url": "assets/js/20.52c8c773.js",
    "revision": "36529be1edcf7e580d827e68ef5aa266"
  },
  {
    "url": "assets/js/21.9e104ac3.js",
    "revision": "3cc9d20b46359e4fa75683a67776c404"
  },
  {
    "url": "assets/js/22.4222484d.js",
    "revision": "c08c2e22b5c809c37e5f632abf3c9a68"
  },
  {
    "url": "assets/js/23.d0c8b400.js",
    "revision": "f1691dc83e6e90cc6bacc5dbc505f265"
  },
  {
    "url": "assets/js/3.02b3224e.js",
    "revision": "ad5dcbfc0ca2af39f34296f706626de0"
  },
  {
    "url": "assets/js/4.63e8b7a1.js",
    "revision": "0adac1f3692bc53eda709cc2d2a46b2b"
  },
  {
    "url": "assets/js/5.ce2a4119.js",
    "revision": "b91c349aa7d994da16d543fa00c513b7"
  },
  {
    "url": "assets/js/6.8544e43a.js",
    "revision": "a8465b2558238d36562c3fc9f07177e5"
  },
  {
    "url": "assets/js/7.4b660fd9.js",
    "revision": "561961a72f7a71578ff4af6a2a8a5635"
  },
  {
    "url": "assets/js/8.1ebc9c37.js",
    "revision": "85c243d2aa735244cae6d77e50d0527c"
  },
  {
    "url": "assets/js/9.6a3a3575.js",
    "revision": "5f28cefd2348f93218e5d06ec9c31595"
  },
  {
    "url": "assets/js/app.6500ee82.js",
    "revision": "0d0ade60b0cf18814291060cbc24f35f"
  },
  {
    "url": "dpr.png",
    "revision": "ee5199b00681fd9bba2e8213b8387474"
  },
  {
    "url": "else/babel.html",
    "revision": "41f3699f5c3ed8a19e9e8f727cf4b2d4"
  },
  {
    "url": "else/bug.html",
    "revision": "c1e23cc90e6fc785ee14c46871e2f501"
  },
  {
    "url": "else/移动端适配.html",
    "revision": "4d699b879557ff54ee758a07672b42d2"
  },
  {
    "url": "icons/android-icon-144x144.png",
    "revision": "6e62ce50be0bcd4880124743b11f42b1"
  },
  {
    "url": "icons/android-icon-192x192.png",
    "revision": "749eb7570911aa13fa7a305f7dfdb042"
  },
  {
    "url": "icons/android-icon-36x36.png",
    "revision": "94d70fb19e77b88129a2a4b44d30273f"
  },
  {
    "url": "icons/android-icon-48x48.png",
    "revision": "6e039016a0d1721277e863e6400107a9"
  },
  {
    "url": "icons/android-icon-72x72.png",
    "revision": "cf3bbf6c5c50306cb1d2af34148fd4ad"
  },
  {
    "url": "icons/android-icon-96x96.png",
    "revision": "171c58f6d99812028cdc433f706fab88"
  },
  {
    "url": "icons/apple-icon-114x114.png",
    "revision": "a1612722a53e36417890844f4aaca4bd"
  },
  {
    "url": "icons/apple-icon-120x120.png",
    "revision": "0fdcdb4e43499467315916e07d5a09e0"
  },
  {
    "url": "icons/apple-icon-144x144.png",
    "revision": "6e62ce50be0bcd4880124743b11f42b1"
  },
  {
    "url": "icons/apple-icon-152x152.png",
    "revision": "bdd5fb6d3e9976d4b66199750e7398a0"
  },
  {
    "url": "icons/apple-icon-180x180.png",
    "revision": "6e4bfb481a5f5546673674ea2f53a80d"
  },
  {
    "url": "icons/apple-icon-57x57.png",
    "revision": "2a3e81c26413d7cfb085132e4d0d78ed"
  },
  {
    "url": "icons/apple-icon-60x60.png",
    "revision": "f3f63dae941a269726cecb63d5eb8ae4"
  },
  {
    "url": "icons/apple-icon-72x72.png",
    "revision": "cf3bbf6c5c50306cb1d2af34148fd4ad"
  },
  {
    "url": "icons/apple-icon-76x76.png",
    "revision": "8df9e1335515138c89abe7489d3331ee"
  },
  {
    "url": "icons/apple-icon-precomposed.png",
    "revision": "0ae26495c87bea19c3238efac57100db"
  },
  {
    "url": "icons/apple-icon.png",
    "revision": "0ae26495c87bea19c3238efac57100db"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "50325b55b6decbf164f49e8ab2ef3a82"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "7d8244cb1190e5818aaf3b5bc7dbe523"
  },
  {
    "url": "icons/favicon-96x96.png",
    "revision": "171c58f6d99812028cdc433f706fab88"
  },
  {
    "url": "icons/ms-icon-144x144.png",
    "revision": "6e62ce50be0bcd4880124743b11f42b1"
  },
  {
    "url": "icons/ms-icon-150x150.png",
    "revision": "868ea201b8975a3f505a31992da8bf60"
  },
  {
    "url": "icons/ms-icon-310x310.png",
    "revision": "635b0545d3369a88a7a3238089a38853"
  },
  {
    "url": "icons/ms-icon-70x70.png",
    "revision": "476a4d57938b8a33701124593cb2301b"
  },
  {
    "url": "index.html",
    "revision": "983af67f9012683617085f884ab99120"
  },
  {
    "url": "library/Axios.html",
    "revision": "00df07e83e02b28b32bafa4f9581aaec"
  },
  {
    "url": "library/Export2Excel.html",
    "revision": "4f088246c574e4d1e981060f3b27c93b"
  },
  {
    "url": "library/Prismjs.html",
    "revision": "d96d1900b99bb27f7970fb52b3e8810c"
  },
  {
    "url": "library/Recommend.html",
    "revision": "be7e72cd4f648a4267f48bed8968f92e"
  },
  {
    "url": "library/RichText.html",
    "revision": "fba458d9656422fc9c9ecdebd4a261c2"
  },
  {
    "url": "library/sortableJS.html",
    "revision": "640ae68dfd88d40ed112802c4e400a73"
  },
  {
    "url": "library/Video.html",
    "revision": "b126a81b845bd5b9a51027d511773279"
  },
  {
    "url": "life/20200913.html",
    "revision": "fd204f53e7d4935c79f3fd147caa18d5"
  },
  {
    "url": "life/docs.html",
    "revision": "b2d186360eaed0f8a4a129df0da1e159"
  },
  {
    "url": "logo.png",
    "revision": "c50a81c3b5f5bb98e755df52df3c857c"
  },
  {
    "url": "vue/basics.html",
    "revision": "53f4b9752a68ce37727cc708aeec8cbe"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
