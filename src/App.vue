<template>
  <div id="app">
    <AlertManager></AlertManager>
    <MenuComponent></MenuComponent>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuComponent from '@/components/Menu'
import AlertManager from '@/components/AlertManager'

export default {
  name: 'app',
  components: {
    MenuComponent,
    AlertManager
  },
  methods: {
    getPokemons: function () {
      this.$http.get(window.API + '/api/pokemons').then(response => {
        this.$store.commit('setPokemons', response.data.collection.response.pokemons)
        this.$store.commit('setPokemonshowWithIndex', 0)
      }).catch( console.error)
    },
    getTypes: function () {
      this.$http.get(window.API + '/api/types').then(response => {
        this.$store.commit('setTypes', response.data.collection.response.types)
      }).catch( console.error)
    }
  },
  mounted: function () {
    this.getPokemons()
    this.getTypes()
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

body {
  margin: 0;
}
</style>
