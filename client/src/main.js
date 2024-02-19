import "./assets/global.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./components/router/index";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
  faCoins,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faComment,
  faUser,
  faLock,
  faEnvelope,
  faUnlock,
  faGlobe,
  faImage,
  faPhone,
  faVenusMars,
  faUserAlt,
  faCoins,
  faInstagram,
  faGithub,
  faLinkedin,
  faFacebook
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router).mount("#app");
