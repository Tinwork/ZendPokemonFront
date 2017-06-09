// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

window.API = 'http://52.208.132.215'
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  methods: {
    compareTime: function(was) {
      return new Date() - was < 3600000
    },
    getToken: function() {
      const token = JSON.parse(window.localStorage.getItem('token'))
      if (token) {
        const datestring = token.timestamp
        if (this.compareTime(datestring)) {
          return token
        } else {
          window.localStorage.removeItem('token')
          router.push({ name: 'Login' })
        }
      } else {
        router.push({ name: 'Login' })
      }
    },
    setToken: function(token) {
      const object = { value: token, timestamp: new Date().getTime() }
      window.localStorage.setItem('token', JSON.stringify(object))
    }
  }
})
