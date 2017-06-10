<template>
<div class="create">
  <h1>Create pokemon</h1>

  <div>
    <label>Name :</label>
    <input type="text" v-model="name">
  </div>

  <div>
    <label>Type :</label>
    <select v-model="type">
      <option disabled value="">Please select one</option>
      <option v-for="t in types" :value="t.id">{{ t.label }}</option>
    </select>
  </div>

  <div>
    <label>Rank :</label>
    <select v-model="rank">
      <option disabled value="">Please select one</option>
      <option v-for="r in rankPosible" :disabled="r.disabled" :value="r.value">{{ r.value }}</option>
    </select>
  </div>

  <div>
    <label>File :</label>
    <input type="file" v-on:change="fileChange">
  </div>

  <div class="evolutions">
    <div>
      <label>Post evolutions :</label>
      <select v-model="evolutions.post_evolution" multiple>
        <option v-for="pokemon in pokemons" :value="parseInt(pokemon.id)">{{pokemon.name}}</option>
      </select>
    </div>

    <div>
      <label>Sub evolutions :</label>
      <select v-model="evolutions.sub_evolution" multiple>
        <option v-for="pokemon in pokemons" :value="parseInt(pokemon.id)">{{pokemon.name}}</option>
      </select>
    </div>
  </div>

  <button @click="createPokemon" :disabled="!name || !type || !rank || !file">Create</button>
</div>
</template>

<script>
export default { 
  name: 'pokemonCreate',
  data() {
    return {
       file: '',
       name: '',
       type: '',
       rank: '',
       evolutions: {
         sub_evolution: [],
         post_evolution: []
       }
    }
  },
  methods: {
    createPokemon () {
      let formData = new FormData();
      let data = JSON.stringify({
        body: {
          name: this.name,
          type: this.type,
          rank: this.rank,
          evolutions: this.evolutions
        }
      })
      debugger
      formData.append('data', data);
      formData.append('file', this.file)
      this.$http.post(`${window.API}/admin/pokemons?token=${this.$root.getToken().value}`, formData).then(response => {
        if (response.data.code === 200) {
          this.update()
        } else {
          console.error(response)
          debugger
        }
      }).catch(error => {
        debugger
      })
    },
    update () {
      this.$http.get(window.API + '/api/pokemons').then(response => {
        this.$store.commit('setPokemons', response.data.collection.response.pokemons)
        this.$store.commit('setPokemonshowWithIndex', 0)
      }).catch( console.error)
      this.$router.push({name: 'PokemonsAdmin' })
    },
    fileChange (e) {
      this.file = e.target.files[0]
    }
  },
  computed: {
    types () {
      return this.$store.getters.types
    },
    pokemons () {
      return this.$store.getters.pokemons
    },
    rankPosible () {
      return this.$store.getters.rankPosible
    }    
  }
}
</script>