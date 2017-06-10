<template>
  <div class="pokemons index">
    <h1>Index</h1>

    <div class="list">
      <div class="pokemon" v-for="pokemon in pokemons">
        <p>{{ pokemon.name }} - {{ pokemon.id }}</p>
        <a @click="showPokemon(pokemon)">Show Pokemon</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default { 
    name: 'pokemonIndex',
    computed: {
      pokemons () {
        return this.$store.getters.pokemons
      }
    },
    methods: {
      showPokemon (pokemon) {
        this.$store.commit('setPokemonShowAdmin', pokemon)
        this.$router.push({name: 'PokemonsShow'})
        console.log(this.$store.getters.pokemonShowAdmin)
      }
    }
  }
</script>