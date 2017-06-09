<template>
  <div class="pokemonShow">
    <h1>Show Pokemon</h1>

    <p>{{ pokemon }}</p>

    <a @click="deletePokemon">Delete</a>

    <router-link :to="{ name: 'PokemonsIndex' }" >Back to index</router-link>

  </div>
</template>

<script>
export default { 
  name: 'pokemonsShow',
  computed: {
    pokemon: function () {
      return this.$store.getters.pokemonShowAdmin
    }
  },
  methods: {
    deletePokemon: function () {
      this.$http.delete(`${window.API}/admin/pokemons/${this.pokemon.id}?token=${this.$root.getToken().value}`)
      this.update()
    },
    update: function () {
      this.$http.get(window.API + '/api/pokemons').then(response => {
        this.$store.commit('setPokemons', response.data.collection.response.pokemons)
        this.$store.commit('setPokemonshowWithIndex', 0)
      }).catch( console.error)
      this.$router.push({name: 'PokemonsAdmin' })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.$store.getters.pokemonShowAdmin) {
        vm.$router.push({name: 'PokemonsIndex'})
      }
    })
  }
}
</script>