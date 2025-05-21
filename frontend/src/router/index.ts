import { createRouter, createWebHistory } from 'vue-router'
import CreatureList from '../pages/CreatureList.vue'
import CreatureDetail from '../pages/CreatureDetail.vue'
import NotFound from '../pages/NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/creatures' },
    { path: '/creatures', component: CreatureList },
    { path: '/creatures/:id', component: CreatureDetail, props: true },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
    
  ]
})
