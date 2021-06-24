import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import qs from 'qs';
import ElementPlus from 'element-plus';
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App)
app.config.globalProperties.axios = axios;
app.use(store).use(router).use(ElementPlus).use(VueAwesomeSwiper).mount('#app')

axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    config.transformRequest = [function (data, headers) {
      return qs.stringify(data);
    }];
    console.log('post config ----', config);
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});