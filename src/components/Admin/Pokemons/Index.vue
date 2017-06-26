<template>
  <div class="pokemons index">
    <table class="table">
      <thead>
        <tr>
          <th>Pokemon</th>
          <th>Rank</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="pokemons">
        <tr class="pokemon" :key="pokemon" v-for="pokemon in pokemons">
          <th scope="row"> {{ pokemon.name }} </th>
          <td>{{ pokemon.rank }}</td>
          <td>{{ pokemon.type }}</td>
          <td>
            <button @click="showPokemon(pokemon)" type="button " class="btn btn-primary ">Show</button>
            <button @click="deletePokemon(pokemon)" type="button " class="btn btn-danger ">Delete</button>
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
    },
    deletePokemon(pokemon) {
      this.$http.delete(`${window.API}/admin/pokemons/${pokemon.id}?token=${this.$root.getToken().value}`).then(response => {
        this.update()
      })
    },
    update() {
      this.$http.get(window.API + '/api/pokemons').then(response => {
        this.$store.commit('setPokemons', response.data.collection.response.pokemons)
        this.$store.commit('setPokemonshowWithIndex', 0)
      }).catch(console.error)
      this.$router.push({ name: 'PokemonsAdmin' })
    }
  }
}
</script>