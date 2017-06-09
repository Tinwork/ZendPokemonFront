<template>
  <div class="pokemons">
    <h1>Pokemons</h1>
     <router-view class="nested-child"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Pokemons'
}
</script>