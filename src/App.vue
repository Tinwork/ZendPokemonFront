<template>
  <div id="app">
    <MenuComponent></MenuComponent>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuComponent from '@/components/Menu'

export default {
  name: 'app',
  components: {
    MenuComponent
  },
  mounted: function () {
    this.$http.get('http://52.48.251.229/api/pokemons').then(response => {
      this.$store.commit('setPokemons', response.data.collection.response.pokemons)
      this.$store.commit('setPokemonshowWithIndex', 0)
    }).catch( console.error)
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10px 0 0 0;
}

body {
  margin: 0;
}
</style>
