<template>
  <form>
    <div class="form-group">
      <label for="label">Label name</label>
      <input type="text" v-model="label" class="form-control" id="label" placeholder="Enter label">
    </div>
  
    <button type="button" class="btn btn-primary" @click="createLabel" :disabled="!label ">Create</button>
  </form>
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
    createLabel() {
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
        }
      }).catch(console.error)
    },
    update() {
      this.$http.get(window.API + '/api/types').then(response => {
        this.$store.commit('setTypes', response.data.collection.response.pokemons)
        this.$router.push({ name: 'TypesAdmin' })
      }).catch(console.error)
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
