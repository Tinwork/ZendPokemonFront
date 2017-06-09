<template>
  <div class="pokemonShow">
    <h1>Show Pokemon</h1>

    <p>{{ pokemon }}</p>
    <p>Name: {{ pokemon.name }}</p>
    <p>Rank: {{ pokemon.rank }}</p>
    <p>Id: {{ pokemon.id }}</p>
    <p>Type: {{ pokemon.type_id }}</p>
    <div v-if="pokemon.evolutions.sub_evolution && pokemon.evolutions.sub_evolution.length > 0">
      <p>Sub evolution:</p>
      <p v-for="evolution in pokemon.evolutions.sub_evolution"> Name: {{evol }}</p>
    </div>

    <div v-if="pokemon.evolutions.post_evolution && pokemon.evolutions.post_evolution.length > 0">
      <p>Post evolution:</p>
      <p v-for="evolution in pokemon.evolutions.post_evolution"> Name: {{evol }}</p>
    </div>

    <button @click="deletePokemon">Delete</button>
    <button @click="deletePokemon">Edit</button>
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
      this.$http.delete(`${window.API}/admin/pokemons/${this.pokemon.id}?token=${this.$root.getToken().value}`).then(response => {
        this.update()
      })  
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