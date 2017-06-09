import Vue from 'vue'
import Ressource from 'vue-resource'
import Router from 'vue-router'
import Home from '@/components/Home'
import Map from '@/components/Map'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
import Dashboard from '@/components/Admin/Dashboard'
import PokemonsAdmin from '@/components/Admin/Pokemons'
import TypesAdmin from '@/components/Admin/Types'

Vue.use(Ressource)
Vue.use(Router)

const router = new Router({
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/dashboard',
      component: Admin,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'pokemons',
          name: 'Pokemons',
          component: PokemonsAdmin
        },
        {
          path: 'types',
          name: 'Types',
          component: TypesAdmin
        }
      ]
    },
    {
      path: '*',
      redirect: {
        name: 'Home'
      }
    }
  ]
})

const compareTime = function(was) {
  return new Date() - was < 3600000
}

router.beforeEach((to, from, next) => {
  if (to.path.match(/\/admin\//)) {
    const token = JSON.parse(window.localStorage.getItem('token'))
    if (token) {
      const datestring = token.timestamp
      if (compareTime(datestring)) {
        next()
      } else {
        window.localStorage.removeItem('token')
        next({
          path: '/login'
        })
      }
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
