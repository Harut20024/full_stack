import { createRouter, createWebHistory } from "vue-router";
import RegisterForm from "../RegLog/RegisterForm.vue";
import LoginForm from "../RegLog/LoginForm.vue";
import NotFound from "../NotFound/NotFound.vue";
import Home from "../homePage/Home.vue";
import PersonalForm from "../RegLog/Personal.vue";
import SqlForm from "../Courses/Sql.vue";
import HtmlForm from "../Courses/Html_Css.vue";
import JsForm from "../Courses/Js.vue";
import MongoForm from "../Courses/Mongo"
const routes = [
  { path: "/register", component: RegisterForm, meta: { requiresGuest: true } },
  { path: "/login", component: LoginForm, meta: { requiresGuest: true } },
  { path: "/personal", component: PersonalForm, meta: { requiresGuest: true } },
  { path: "/course/SQL", component: SqlForm, meta: { requiresAuth: true } },
  { path: "/course/HTML", component: HtmlForm, meta: { requiresAuth: true } },
  { path: "/course/JS", component: JsForm, meta: { requiresAuth: true } },
  { path: "/course/MongoDB", component: MongoForm, meta: { requiresAuth: true } },
  { path: "/home", component: Home },
  { path: "/", redirect: "/home" },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const hasCompletedRegistration = !!localStorage.getItem("userId");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/home");
  } else if (to.path === "/personal" && !hasCompletedRegistration) {
    next("/error");
  } else if (to.path.startsWith("/course/") && !hasCompletedRegistration) {
    next("/login");
  } else {
    next();
  }
});

export default router;
