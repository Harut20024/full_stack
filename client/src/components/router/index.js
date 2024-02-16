import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../RegLog/RegisterForm.vue';
import LoginForm from '../RegLog/LoginForm.vue';

const routes = [
  { path: '/register', component: RegisterForm },
  { path: '/login', component: LoginForm },
  { path: '/', redirect: '/register' } 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
