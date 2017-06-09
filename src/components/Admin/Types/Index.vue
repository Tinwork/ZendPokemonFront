<template>
  <div class="types index">
    <h1>Index</h1>

    <div class="list">
      <div class="type" v-for="t in types">
        <p>{{ t.label }} - {{ t.id }}</p>
        <a @click="deleteType(t)">Delete Type</a>
      </div>
    </div>
  </div>
</template>

<script>
export default { 
  name: 'typeIndex',
  methods: {
    deleteType: function (type) {
      this.$http.delete(`${window.API}/admin/types/${type.id}?token=${this.$root.getToken().value}`).then(response => {
        this.update()
      })
    },
    update: function () {
      this.$http.get(window.API + '/api/types').then(response => {
        this.$store.commit('setTypes', response.data.collection.response.types)
      }).catch( console.error)
      this.$router.push({name: 'TypesAdmin' })
    }
  },
  computed: {
    types: function () {
      return this.$store.getters.types
    }
  } 

}
</script>