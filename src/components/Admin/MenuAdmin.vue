<template>
  <nav class="admin-menu">
    <ul>
      <li><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
      <li><router-link :to="{ name: 'PokemonsAdmin' }"> Pokemons</router-link></li>
      <li><router-link :to="{ name: 'TypesAdmin' }">Types</router-link></li>
      <li class="right"><a @click="logout">Logout</a></li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'MenuAdmin',
    methods: {
      logout () {
        window.localStorage.removeItem('token')
        this.$router.push({name: 'Home'})
      }
    }
  }
</script>

<style scoped>
nav {
  overflow: auto;
  box-sizing: border-box;
  padding: 10px;
}

ul {
  display: block;
  overflow: auto;
  clear: both;
  padding-left: 0;
}

li {
  float: left;
  margin: 0 10px;
  display: block;
}

.right {
  float: right
}
</style>