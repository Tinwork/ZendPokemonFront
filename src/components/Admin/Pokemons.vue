<template>
  <div class="pokemons">
    <h1>Pokemons</h1>
    <router-link :to="{ name: 'PokemonsIndex' }">Index</router-link>
    <router-link :to="{ name: 'PokemonsCreate' }">Create</router-link>
    <router-view class="nested-child"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Pokemons'
}
</script>