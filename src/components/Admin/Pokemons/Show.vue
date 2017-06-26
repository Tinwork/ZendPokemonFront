<template>
  <div class="pokemonShow">
    <div class="show" v-if="mode === 'show'">
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
  
      <button @click="setMode('edit')" type="button " class="btn btn-primary ">Edit</button>
    </div>
  
    <div class="edit" v-if="mode === 'edit'">
      <form-pokemon></form-pokemon>
      <button @click="setMode('show')" type=" button " class="btn btn-primary ">Show</button>
    </div>
  
    <button type="button " class="btn btn-danger " @click="deletePokemon">Delete</button>
  
  </div>
</template>

<script>
import Form from './Form'
export default {
  name: 'pokemonsShow',
  data() {
    return {
      mode: 'show'
    }
  },
  components: {
    'form-pokemon': Form
  },
  computed: {
    pokemon() {
      return this.$store.getters.pokemonShowAdmin
    },
    pokemons() {
      return this.$store.getters.pokemons
    }
  },
  methods: {
    setMode(mode) {
      this.mode = mode
    },
    updatePokemon() {
      debugger
    },
    deletePokemon() {
      this.$http.delete(`${window.API}/admin/pokemons/${this.pokemon.id}?token=${this.$root.getToken().value}`).then(response => {
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
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.pokemonShowAdmin) {
        vm.$router.push({ name: 'PokemonsIndex' })
      }
    })
  }
}
</script>