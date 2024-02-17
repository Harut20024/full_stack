import { createRouter, createWebHistory } from "vue-router";
import RegisterForm from "../RegLog/RegisterForm.vue";
import LoginForm from "../RegLog/LoginForm.vue";
import NotFound from "../NotFound/NotFound.vue";
import Home from "../homePage/Home.vue";
import PersonalForm from "../RegLog/Personal.vue";

const routes = [
  { path: "/register", component: RegisterForm, meta: { requiresGuest: true } },
  { path: "/login", component: LoginForm, meta: { requiresGuest: true } },
  { path: "/personal", component: PersonalForm, meta: { requiresGuest: true } }, // Removed requiresGuest meta
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  { path: "/", redirect: "/home" },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const hasCompletedRegistration = !!localStorage.getItem("userId"); // Check if user has completed registration

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/home");
  } else if (to.path === "/personal" && !hasCompletedRegistration) {
    next("/home"); 
  } else {
    next();
  }
});

export default router;
