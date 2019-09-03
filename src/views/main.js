import 'babel-polyfill'
import Vue from 'vue'
import iView from 'iview'
import { router } from './router/index'
import store from './store'
import App from './app.vue'
import preview from '@/plugins/preview/index'

import ConfirmBtn from '@/views/comm/ConfirmBtn.vue'
import VueAMap from 'vue-amap'

// import VueSocketio from 'vue-socket.io-extended'
// import io from 'socket.io-client'

// Vue.use(VueSocketio, io('ws://10.52.10.97:8088/Fire/user3/group1'))
localStorage.removeItem('_AMap_raster')
Vue.use(VueAMap)

const mapAppId = '5e8726f2361ba5deec3f65d7fd34a55d'
// const mapServerId = 'c72949d3a2056d1757146280563c2dfe'
VueAMap.initAMapApiLoader({
    key: mapAppId,
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
    uiVersion: '1.0.11',
    v: '1.4.4'
})
Vue.component('ConfirmBtn', ConfirmBtn)

Vue.use(iView)
Vue.use(preview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {
        top: 0,
        bottom: 0
    },
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
})

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
})
Vue.config.devtools = process.env.NODE_ENV !== 'production'
