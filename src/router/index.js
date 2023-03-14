import Vue from 'vue'
import VueRouter from 'vue-router'
import EmpleadosView from '../views/EmpleadosView.vue'
import RolesView from '../views/RolesView.vue'
import EntregasView from '../views/EntregasView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Empleados',
    component: EmpleadosView,
    props: true
  },
  {
    path: '/empleados',
    name: 'Empleado',
    component:EmpleadosView,
    props: true
  },
  {
    path: '/roles',
    name: 'Roles',
    component:RolesView
  },
  {
    path: '/entregas',
    name: 'Entregas',
    component:EntregasView
  },
  {
    path: '*',
    name: 'home',
    component: EmpleadosView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
