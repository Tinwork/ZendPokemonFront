<template>
<div class="create">
  <h1>Create label</h1>

  <div>
    <label>Label :</label>
    <input type="text" v-model="label">
  </div>

  <button @click="createLabel" :disabled="!label">Create</button>
</div>
</template>

<script>
export default { 
  name: 'pokemonCreate',
  data() {
    return {
       label: ''
    }
  },
  methods: {
    createLabel () {
      let formData = new FormData();
      let data = JSON.stringify({
        body: {
          label: this.label
        }
      })
      formData.append('data', data);
      this.$http.post(`${window.API}/admin/types?token=${this.$root.getToken().value}`, formData).then(response => {
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
      this.$http.get(window.API + '/api/types').then(response => {
        this.$store.commit('setTypes', response.data.collection.response.pokemons)
      }).catch( console.error)
      this.$router.push({name: 'TypesAdmin' })
    }
  }
}
</script>