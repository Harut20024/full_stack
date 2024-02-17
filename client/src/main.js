import { createApp } from "vue";
import App from "./App.vue";
import router from "./components/router/index";  
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faLock, faEnvelope,faUnlock} from "@fortawesome/free-solid-svg-icons"; // Import faEnvelope
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUser, faLock,faEnvelope,faUnlock);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router).mount("#app");
