import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(VueLazyload,{
  loading: require('./assets/avatar.jpg')
})
new Vue({
  render: h => h(App),
}).$mount('#app')
