import { createRouter, createWebHistory } from "vue-router";
import RegisterForm from "../RegLog/RegisterForm.vue";
import LoginForm from "../RegLog/LoginForm.vue";
import NotFound from "../NotFound/NotFound.vue"; // Adjust the path as necessary

const routes = [
  { path: "/register", component: RegisterForm },
  { path: "/login", component: LoginForm },
  { path: "/home", redirect: "/register" },
  { path: "/", redirect: "/register" },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }, // Catch-all route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
