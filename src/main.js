import { createApp } from "vue";
import { createPinia } from "pinia";
import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App.vue";
import router from "./router";

import "@/assets/reset.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// AOS 초기화
AOS.init();

app.mount("#app");
