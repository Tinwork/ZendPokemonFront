import Vue from 'vue'
import Ressource from 'vue-resource'
import Router from 'vue-router'
import Home from '@/components/Home'
import Map from '@/components/Map'

Vue.use(Ressource)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '*',
      redirect: {
        name: 'Home'
      }
    }
  ]
})
