import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

document.body.addEventListener('click', event => {
    if (event.target.tagName.toLowerCase() == 'a' &&
        event.target.attributes.openExternal != undefined) {
            event.preventDefault()
            require('electron').shell.openExternal(event.target.href)
        }
})
global.vueJS = new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
})
vueJS['$mount']('#app')