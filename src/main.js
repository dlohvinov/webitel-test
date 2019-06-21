import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'
import routes from './routes'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuetify);

export const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
