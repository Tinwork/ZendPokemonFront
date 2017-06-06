<template>
  <div class="login">
    <h1>Login</h1>

    <div>
      <label for="login">Login</label>
      <input type="text" name="login" v-model="login">
    </div>

    <div>
      <label for="password">Password</label>
      <input type="text" name="password" v-model="password">
    </div>

    <button @click="validateInput">Valider</button>
    
  </div>
</template>

<script>
import ol from 'openlayers'

export default {
  name: 'login',
  data: function () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    validateInput: function () {
      if (this.login === this.$store.getters.login &&
          this.password === this.$store.getters.password) {
        this.$store.commit('addAlert', { className: 'success', content: 'Vous avez bien été connecter' })
        this.$router.go({ name: 'Admin'})
      } else {
        this.$store.commit('addAlert', { className: 'danger', content: 'Veuillez vérifier vos identifients' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
