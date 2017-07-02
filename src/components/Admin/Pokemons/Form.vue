<template>
  <form>
    <div class="form-group">
      <label for="name">Pokemon name</label>
      <input type="text" v-model="name" class="form-control" id="name" placeholder="Enter name">
    </div>
  
    <div class="form-group">
      <label for="type">Select a type</label>
      <multiselect v-model="type" :options="types" :multiple="true" label="label" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="Pick some"></multiselect>
    </div>
  
    <div class="form-group">
      <label for="type">Select a rank</label>
      <multiselect v-model="rank" placeholder="Select one" :options="rankPosible" :allow-empty="true"></multiselect>
    </div>
  
    <div class="form-group">
      <label for="import-photo">Import a photo</label>
      <input v-on:change="fileChange" type="file" class="form-control-file" id="import-photo" aria-describedby="fileHelp">
    </div>
  
    <div class="form-group">
      <label for="sub-evolution">Sub evolutions</label>
      <multiselect v-model="evolutions.sub_evolution" :options="pokemons" :multiple="true" label="name" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="Pick some"></multiselect>
    </div>
  
    <div class="form-group">
      <label for="post-evolution">Post evolutions</label>
      <multiselect v-model="evolutions.post_evolution" :options="pokemons" :multiple="true" label="name" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="Pick some"></multiselect>
    </div>
  
    <button v-if="mode === 'create'" type="button" class="btn btn-primary" @click="createPokemon" :disabled="!name || !rank">Create</button>
    <button v-if="mode === 'edit'" type="button" class="btn btn-primary" @click="editPokemon" :disabled="!name || !rank">Edit</button>
  
  </form>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'form',
  props: ['mode', 'pokemon'],
  data() {
    let pokemon = {
      name: '',
      type: [],
      rank: '',
      evolutions: {
        sub_evolution: [],
        post_evolution: []
      }
    }
    if (typeof this.pokemon !== 'undefined') {
      const types = this.$store.getters.types
      const type = this.pokemon.type_id.reduce((memo, t) => {
        const foundType = types.find(type => type.label === t.label)
        memo.push({
          id: parseInt(foundType.id),
          label: foundType.label,
          badge_path: foundType.badge_path,
          color: foundType.color
        })
        return memo
      }, [])
      
      pokemon = Object.assign(pokemon, this.pokemon, { type })
    }
    return {
      file: '',
      name: pokemon.name || '',
      type: pokemon.type || [],
      rank: pokemon.rank || '',
      evolutions: pokemon.evolutions
    }
  },
  methods: {
    editPokemon() {
      let formData = new FormData();
      // let fData = JSON.stringify({
      //   body: {
      //     id: this.pokemon.id,
      //     name: this.name,
      //     type: this.parseTypes(this.type),
      //     rank: this.rank,
      //     evolutions: this.parseEvolutions(this.evolutions)
      //   }
      // })
      let data = JSON.stringify({
        body: {
          rank: this.rank,
          name: this.name,
          type: this.type,
          evolutions: this.parseEvolutions(this.evolutions)
        }
      })
      formData.append('data', data);
      if (this.file) {
        formData.append('file', this.file)
      }

      this.$http.put(`${window.API}/admin/pokemons/${this.pokemon.id}?token=${this.$root.getToken().value}`, formData).then(response => {
        if (response.data.code === 200) {
          this.update()
        } else {
          console.error(response)
        }
      }).catch(console.error)
    },
    parseTypes(types) {
      return types.map(type => type.id)
    },
    parseEvolutions(evolutions) {
      return ['sub_evolution', 'post_evolution'].reduce((memo, string) => {
        if (evolutions[string] && evolutions[string].length !== 0) {
          memo[string] = evolutions[string].map(evolution => parseInt(evolution.rank))
        } else {
          memo[string] = null
        }
        return memo
      }, {})
    },
    createPokemon() {
      let formData = new FormData();
      let data = JSON.stringify({
        body: {
          name: this.name,
          type: this.parseTypes(this.type),
          rank: this.rank,
          evolutions: this.parseEvolutions(this.evolutions)
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
    types() {
      return this.$store.getters.types
    },
    pokemons() {
      return this.$store.getters.pokemons
    },
    rankPosible() {
      return this.$store.getters.rankPosible
    }
  },
  components: {
    'multiselect': Multiselect
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
form {
  max-width: 1000px;
  margin: auto;
  padding: 0 20px;
  text-align: left;
}
</style>
