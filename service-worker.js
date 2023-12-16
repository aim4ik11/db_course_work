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
    "revision": "db03cfeb5c667abda56928bf7bfec77f"
  },
  {
    "url": "assets/css/0.styles.97c23040.css",
    "revision": "1001d7b819cfbc129e419d60da2cdac3"
  },
  {
    "url": "assets/img/relation-diagram.60415180.png",
    "revision": "604151805a60802b9e5d02489fbbe1d3"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.a4e18fb0.js",
    "revision": "8459424b41cab992769c3520f58768a1"
  },
  {
    "url": "assets/js/11.d542e240.js",
    "revision": "391b5818128dad191fa4c6fe44edef2d"
  },
  {
    "url": "assets/js/12.2dc587c8.js",
    "revision": "1c3042c9fb998f38a46f483b0dc94cb4"
  },
  {
    "url": "assets/js/13.2141d0d8.js",
    "revision": "8f0ac071a8f1a54007b32e7adb0e941b"
  },
  {
    "url": "assets/js/14.badbbadd.js",
    "revision": "9cc5d88b88594731e4da52589d7805b5"
  },
  {
    "url": "assets/js/15.9e9c9169.js",
    "revision": "69e2e7a04f89443be65c3634bdda9260"
  },
  {
    "url": "assets/js/16.ecaed68e.js",
    "revision": "be5fdc057e7b20103c99a41fe35b21aa"
  },
  {
    "url": "assets/js/17.e497cea4.js",
    "revision": "55ec47ba3f4d7bf992c1daf1dd482adf"
  },
  {
    "url": "assets/js/18.430b7a25.js",
    "revision": "b0c38568c6b04851ccd5755563177db6"
  },
  {
    "url": "assets/js/19.8149f7bf.js",
    "revision": "30ffc06df434480af3e522327e88e329"
  },
  {
    "url": "assets/js/2.4bbdcb41.js",
    "revision": "65c8ee5dc990e3c0abe730bfac064665"
  },
  {
    "url": "assets/js/20.a3795261.js",
    "revision": "4772bcfbba53aa8d9dc0ae052ac30f60"
  },
  {
    "url": "assets/js/21.11adcd2c.js",
    "revision": "30cea69f73951252494842f648fedb95"
  },
  {
    "url": "assets/js/22.4ba3ee7c.js",
    "revision": "59cc13a39b614b1a878cf661097935db"
  },
  {
    "url": "assets/js/23.09e2d37e.js",
    "revision": "6f13f4b6834e0b0c3cff6b51394e136b"
  },
  {
    "url": "assets/js/24.319efdfe.js",
    "revision": "aca5e6af49560dfb0f77142990f014b8"
  },
  {
    "url": "assets/js/26.eb3d8562.js",
    "revision": "7b4bfdd5126bd0403799e9028ba4945b"
  },
  {
    "url": "assets/js/3.4aceb8fd.js",
    "revision": "2170976d95de870e1cef2d67723addd6"
  },
  {
    "url": "assets/js/4.82a2e483.js",
    "revision": "4d8ba40da6480c7204d44dead2cb0ecb"
  },
  {
    "url": "assets/js/5.f0140710.js",
    "revision": "f6c97feda6a20285e557451f7aa47b64"
  },
  {
    "url": "assets/js/6.b3c8eb68.js",
    "revision": "6f585e00e9d701ea451933cd4a3910eb"
  },
  {
    "url": "assets/js/7.09049dfe.js",
    "revision": "fc6aac0d35c35f67c9b34c990783b2ab"
  },
  {
    "url": "assets/js/8.fc9e7761.js",
    "revision": "152f28f4b89761604aee1b4a06511456"
  },
  {
    "url": "assets/js/9.30f71dd9.js",
    "revision": "3a09bbcbb5db15f6f867841142193cba"
  },
  {
    "url": "assets/js/app.53f3622a.js",
    "revision": "17782ef756dc913917363fd86b569d61"
  },
  {
    "url": "conclusion/index.html",
    "revision": "450922f57a62b0d7808772c4cf39ed8e"
  },
  {
    "url": "design/index.html",
    "revision": "bb7eac1e51680024dfe90d766688167d"
  },
  {
    "url": "index.html",
    "revision": "0a423ddd5c833a48aba67e9142ff4286"
  },
  {
    "url": "intro/index.html",
    "revision": "bdbcb39079bc3fc51760e8bbba433e09"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "526754e392dd47b4959447375e758f2d"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "373a4c2607e67b4d7b9166431d576e21"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "c5cb77ff6ecbd580694f4c46b96a37b1"
  },
  {
    "url": "software/index.html",
    "revision": "394b2585a95fe6fa6190779f4749ace4"
  },
  {
    "url": "test/index.html",
    "revision": "b967050d0c9c27f5b0138d7090d8fd4a"
  },
  {
    "url": "use cases/index.html",
    "revision": "71181d2a759a9d4a1cfda7dc91ca5459"
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
