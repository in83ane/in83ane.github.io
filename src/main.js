import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/second', component: () => import('./views/SecondPage.vue'), name: 'second' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app');
