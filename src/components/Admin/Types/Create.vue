<template>
  <form>
    <div class="form-group">
      <label for="label">Label name</label>
      <input type="text" v-model="label" class="form-control" id="label" placeholder="Enter label">
    </div>
  
    <div class="form-group">
      <label for="color">Label color</label>
      <color-picker v-model="color"></color-picker>
    </div>
  
    <div class="form-group">
      <label for="badge">Select a badge</label>
      <multiselect v-model="badge" placeholder="Select one" :options="badgeTypes" :allow-empty="true"></multiselect>
    </div>
  
    <button type="button" class="btn btn-primary" @click="createLabel" :disabled="!label ">Create</button>
  </form>
</template>

<script>
import { Chrome } from 'vue-color'
import Multiselect from 'vue-multiselect'

const badgeTypes = [
  'acier',
  'combat',
  'dragon',
  'eau',
  'electrik',
  'fee',
  'feu',
  'glace',
  'insecte',
  'normal',
  'plante',
  'poison',
  'psy',
  'roche',
  'sol',
  'spectre',
  'tenebres',
  'vol'
]

export default {
  name: 'typeCreate',
  data() {
    return {
      label: '',
      color: '',
      badge: '',
      badgeTypes
    }
  },
  methods: {
    createLabel() {
      let formData = new FormData();
      let data = JSON.stringify({
        body: {
          label: this.label,
          color: this.color.hex,
          badge: `${window.API}/img/badges/${this.badge}.png`
        }
      })
      formData.append('data', data);
      this.$http.post(`${window.API}/admin/types?token=${this.$root.getToken().value}`, formData).then(response => {
        if (response.data.code === 200) {
          this.update()
        } else {
          console.error(response)
        }
      }).catch(console.error)
    },
    update() {
      this.$http.get(window.API + '/api/types').then(response => {
        this.$store.commit('setTypes', response.data.collection.response.pokemons)
        this.$router.push({ name: 'TypesAdmin' })
      }).catch(console.error)
    }
  },
  components: {
    'color-picker': Chrome,
    'multiselect': Multiselect
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
form {
  max-width: 1000px;
  margin: auto 20px;
  text-align: left;
}
</style>
