import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import VueResource from "vue-resource";

import App from './App.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
