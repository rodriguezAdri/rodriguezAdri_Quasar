import { createRouter, createWebHistory } from 'vue-router';
import Pilotos from '../pages/PilotosPage.vue';
import DetallePiloto from '../pages/DetallePiloto.vue';

const routes = [
  {
    path: '/',
    name: 'pilotos',
    component: Pilotos
  },
  {
    path: '/piloto/:pilotoId',
    name: 'detallePiloto',
    component: DetallePiloto,
    props: true, // Asegúrate de que los parámetros sean pasados como props
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
