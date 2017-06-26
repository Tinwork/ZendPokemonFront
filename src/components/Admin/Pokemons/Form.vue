<template>
  <form>
  
    <div class="form-group">
      <label for="name">Pokemon name</label>
      <input type="text" v-model="name" class="form-control" id="name" placeholder="Enter name">
    </div>
  
    <div class="form-group">
      <label for="type">Select a type</label>
      <select class="form-control" v-model="type" id="type">
        <option disabled value="">Please select one</option>
        <option v-for="t in types" :value="t.id">{{ t.label }}</option>
      </select>
    </div>
  
    <div class="form-group">
      <label for="type">Select a rank</label>
      <select class="form-control" v-model="rank" id="type">
        <option disabled value="">Please select one</option>
        <option v-for="r in rankPosible" :disabled="r.disabled" :value="r.value">{{ r.value }}</option>
      </select>
    </div>
  
    <div class="form-group">
      <label for="import-photo">Import a photo</label>
      <input v-on:change="fileChange" type="file" class="form-control-file" id="import-photo" aria-describedby="fileHelp">
    </div>
  
    <div class="form-group">
      <label for="post-evolution">Post evolutions</label>
      <select v-model="evolutions.post_evolution" multiple class="form-control" id="post-evolution">
        <option :key="pokemon" v-for="pokemon in pokemons" :value="parseInt(pokemon.rank)">{{pokemon.name}}</option>
      </select>
    </div>
  
    <div class="form-group">
      <label for="sub-evolution">Sub evolutions</label>
      <select v-model="evolutions.sub_evolution" multiple class="form-control" id="sub-evolution">
        <option :key="pokemon" v-for="pokemon in pokemons" :value="parseInt(pokemon.rank)">{{pokemon.name}}</option>
      </select>
    </div>
  
    <button v-if="mode === 'create'" type="button" class="btn btn-primary" @click="createPokemon" :disabled="!name || !type || !rank">Create</button>
    <button v-if="mode === 'edit'" type="button" class="btn btn-primary" @click="editPokemon" :disabled="!name || !type || !rank">Edit</button>
  
  </form>
</template>

<script>
export default {
  name: 'form',
  props: ['mode', 'pokemon'],
  data() {
    let pokemon = {
      name: '',
      type: '',
      rank: '',
      evolutions: {
        sub_evolution: [],
        post_evolution: []
      }
    }
    if (typeof this.pokemon !== 'undefined') {
      pokemon = Object.assign(pokemon, this.pokemon)
    }
    return {
      file: '',
      name: pokemon.name || '',
      type: pokemon.type || '',
      rank: pokemon.rank || '',
      evolutions: pokemon.evolutions
    }
  },
  methods: {
    editPokemon() {
      let formData = new FormData();
      let data = JSON.stringify({
        body: {
          name: this.name,
          type: this.type,
          rank: this.rank,
          evolutions: this.evolutions
        }
      })
      formData.append('data', data);
      if (this.file) {
        formData.append('file', this.file)
      }

      this.$http.put(`${window.API}/admin/pokemons?token=${this.$root.getToken().value}`, formData).then(response => {
        if (response.data.code === 200) {
          this.update()
        } else {
          console.error(response)
        }
      }).catch(console.error)
    },
    createPokemon() {
      let formData = new FormData();
      let data = JSON.stringify({
        body: {
          name: this.name,
          type: this.type,
          rank: this.rank,
          evolutions: this.evolutions
        }
      })
      formData.append('data', data);
      formData.append('file', this.file)
      debugger
      this.$http.post(`${window.API}/admin/pokemons?token=${this.$root.getToken().value}`, formData).then(response => {
        if (response.data.code === 200) {
          this.update()
        } else {
          console.error(response)
        }
      }).catch(console.error)
    },
    update() {
      this.$http.get(window.API + '/api/pokemons').then(response => {
        this.$store.commit('setPokemons', response.data.collection.response.pokemons)
        this.$store.commit('setPokemonshowWithIndex', 0)
      }).catch(console.error)
      this.$router.push({ name: 'PokemonsAdmin' })
    },
    fileChange(e) {
      this.file = e.target.files[0]
    }
  },
  computed: {
    types: function () {
      return this.$store.getters.types
    },
    pokemons: function () {
      return this.$store.getters.pokemons
    },
    rankPosible: function () {
      return this.$store.getters.rankPosible
    }
  }
}
</script>

<style>
form {
  max-width: 1000px;
  margin: auto 20px;
  text-align: left;
}
</style>
