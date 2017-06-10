<template>
  <div class="pokemonShow">
    <h1>Show Pokemon</h1>

    <p>{{ pokemon }}</p>

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

      <button @click="setMode('edit')">Edit</button>
    </div>

    <div class="edit" v-if="mode === 'edit'">
      <div>
        <label>Name :</label>
        <input type="text" v-model="pokemon.name">
      </div>

      <div>
        <label>Type :</label>
        <select v-model="pokemon.type_id">
          <option disabled value="">Please select one</option>
          <option v-for="t in types" :value="t.id">{{ t.label }}</option>
        </select>
      </div>

      <div>
        <label>Rank :</label>
        <select v-model="pokemon.rank">
          <option disabled value="">Please select one</option>
          <option v-for="r in rankPosible" :disabled="r.disabled" :value="r.value">{{ r.value }}</option>
        </select>
      </div>

      <div class="evolutions">
        <div>
          <label>Post evolutions :</label>
          <select v-model="pokemon.evolutions.post_evolution" multiple>
            <option v-for="pokemon in pokemons" :value="parseInt(pokemon.id)">{{pokemon.name}}</option>
          </select>
        </div>

        <div>
          <label>Sub evolutions :</label>
          <select v-model="pokemon.evolutions.sub_evolution" multiple>
            <option v-for="pokemon in pokemons" :value="parseInt(pokemon.id)">{{pokemon.name}}</option>
          </select>
        </div>
      </div>

      <button @click="setMode('show')">Show</button>
    </div>

    <button @click="deletePokemon">Delete</button>
    
  </div>
</template>

<script>
export default { 
  name: 'pokemonsShow',
  data() {
    return {  
      mode: 'show'
    }
  },
  computed: {
    pokemon () {
      return this.$store.getters.pokemonShowAdmin
    },
    pokemons () {
      return this.$store.getters.pokemons
    }
  },
  methods: {
    setMode (mode) {
      this.mode = mode
    },
    deletePokemon () {
      this.$http.delete(`${window.API}/admin/pokemons/${this.pokemon.id}?token=${this.$root.getToken().value}`).then(response => {
        this.update()
      })  
    },
    update () {
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