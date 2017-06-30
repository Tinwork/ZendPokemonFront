<template>
  <form>
    <div class="form-group" v-if="type">
      <label for="label">Label name</label>
      <input type="text" v-model="label" class="form-control" id="label" placeholder="Enter label">
    </div>
  
    <div class="form-group">
      <label for="color">Label color</label>
      <color-picker v-model="color"></color-picker>
    </div>
  
    <div class="form-group">
      <label for="badge">Select a badge</label>
      <multiselect v-if="badgeTypes" v-model="badge" placeholder="Select one" :options="badgeTypes" track-by="src" label="label" :allow-empty="true"></multiselect>
    </div>
  
    <button type="button" class="btn btn-primary" @click="createLabel" :disabled="!label ">Create</button>
  </form>
</template>

<script>
import { Chrome } from 'vue-color'
import Multiselect from 'vue-multiselect'


export default {
  name: 'typeEdit',
  data() {
    return {
      label: '',
      color: '',
      badge: '',
      badgeTypes: ''
    }
  },
  methods: {
    createLabel() {
      let formData = new FormData();
      let data = JSON.stringify({
        body: {
          label: this.label,
          color: this.color.hex || this.color,
          badge_path: this.badge.src
        }
      })
      formData.append('data', data);
      this.$http.put(`${window.API}/admin/types/${this.type.id}?token=${this.$root.getToken().value}`, formData).then(response => {
        if (response.data.code === 200) {
          this.update()
        } else {
          console.error(response)
        }
      }).catch(console.error)
    },
    update() {
      this.$http.get(window.API + '/api/types').then(response => {
        this.$store.commit('setTypes', response.data.collection.response.types)
        this.$router.push({ name: 'TypesAdmin' })
      }).catch(console.error)
    }
  },
  components: {
    'color-picker': Chrome,
    'multiselect': Multiselect
  },
  computed: {
    type() {
      const type = this.$store.getters.typeShowAdmin
      this.label = type.label
      this.color = type.color
      this.badge = {
        src: type.badge_path
      }
      return type
    }
  },
  created() {
    if (typeof this.type === 'undefined') {
      this.$router.push({ name: 'TypesEdit' })
    }
    this.$http.get(`${window.API}/api/types/badges`).then(response => {
      this.badgeTypes = response.data.collection.map(obj => {
        return {
          label: Object.keys(obj)[0],
          src: Object.values(obj)[0]
        }
      })
    }).catch(console.error)
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
