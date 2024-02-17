import { createApp } from "vue";
import App from "./App.vue";
import router from "./components/router/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faLock,
  faEnvelope,
  faUnlock,
  faGlobe,
  faImage,
  faPhone,
  faVenusMars,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faUser,
  faLock,
  faEnvelope,
  faUnlock,
  faGlobe,
  faImage,
  faPhone,
  faVenusMars,
  faUserAlt
); // Include faUserAlt

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router).mount("#app");
