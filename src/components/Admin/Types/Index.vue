<template>
  <div class="types index">
    <table class="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Badge</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="type" :key="t" v-bind:types="types" v-for="t in types">
          <th scope="row"> {{ t.label }} </th>
          <td>
            <img :src="t.badge_path">
          </td>
          <td>
  
            <button @click="editType(t)" type="button " class="btn btn-primary ">Edit</button>
  
            <button @click="deleteType(t)" type="button " class="btn btn-danger ">Delete</button>
  
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'typeIndex',
  methods: {
    deleteType(type) {
      this.$http.delete(`${window.API}/admin/types/${type.id}?token=${this.$root.getToken().value}`).then(response => {
        this.update()
      })
    },
    editType(type) {
      this.$store.commit('setTypeShowAdmin', type)
      this.$router.push({ name: 'TypesEdit' })
    },
    update() {
      this.$http.get(window.API + '/api/types').then(response => {
        this.$store.commit('setTypes', response.data.collection.response.types)
      }).catch(console.error)
      this.$router.push({ name: 'TypesIndex' })
    }
  },
  computed: {
    types() {
      return this.$store.getters.types
    }
  }

}
</script>