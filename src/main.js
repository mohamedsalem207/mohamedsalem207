import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "bootstrap";
import "@/../node_modules/bootstrap/dist/css/bootstrap.css";
import "./css/style.css";

createApp(App).use(router).mount("#app");
