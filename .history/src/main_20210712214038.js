import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import qs from 'qs';
import ElementPlus from 'element-plus';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Pagination } from "swiper/core";
import i18n from './i18n'
import { ElMessage } from "element-plus";

import "swiper/swiper.less";
import "swiper/components/pagination/pagination.less";
import 'element-plus/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'
import './assets/allCss/App.less'

i18n.locale = "cn";
const app = createApp(App)
app.config.globalProperties.axios = axios;
app.config.globalProperties.$message = ElMessage;
app.use(store)
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .component("Swiper", Swiper)
  .component("SwiperSlide", SwiperSlide)
app.mount('#app')

SwiperCore.use([Pagination]);

axios.interceptors.request.use((config) => {
  config.headers['authorization'] = JSON.parse(sessionStorage.getItem('authorization')) //token
  if (config.method === 'post') {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    config.transformRequest = [function (data, headers) {
      return qs.stringify(data);
    }];
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});

// axios.interceptors.response.use((res) => {
//   return Promise.resolve(res);
// }, (err) => {
//   return Promise.reject(err);
// });