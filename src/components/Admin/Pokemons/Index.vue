<template>
  <div class="pokemons index">
    <table class="table">
      <thead>
        <tr>
          <th>Pokemon</th>
          <th>Rank</th>
          <th>Type</th>
          <th>Show</th>
        </tr>
      </thead>
      <tbody>
        <tr class="pokemon" v-for="pokemon in pokemons">
          <th scope="row"> {{ pokemon.name }} </th>
          <td>{{ pokemon.rank }}</td>
          <td>{{ pokemon.type }}</td>
          <td>
            <button @click="showPokemon(pokemon)" type="button " class="btn btn-primary ">Show</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'pokemonIndex',
  computed: {
    pokemons() {
      return this.$store.getters.pokemons
    }
  },
  methods: {
    showPokemon(pokemon) {
      this.$store.commit('setPokemonShowAdmin', pokemon)
      this.$router.push({ name: 'PokemonsShow' })
      console.log(this.$store.getters.pokemonShowAdmin)
    }
  }
}
</script>