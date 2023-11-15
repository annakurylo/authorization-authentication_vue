import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from './vuex/store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/auth';

const app = createApp(App);
app.use(router);
app.use(store)
app.mount("#app");



