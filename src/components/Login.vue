<template>
  <div class="login">
    <h1>Login</h1>

    <div>
      <label for="login">Login</label>
      <input type="text" name="login" v-model="login">
    </div>

    <div>
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password">
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
      login: 'did',
      password: 'root'
    }
  },
  methods: {
    validateInput: function () {
      let formData = new FormData();
      formData.append('username', this.login);
      formData.append('password', this.password);
      this.$http.post(window.API + '/admin/oauth', formData)
      .then(response => {
        this.$root.setToken(response.data.response.token)
        this.$store.commit('addAlert', { className: 'success', content: 'Vous avez bien été connecter' })
        this.$router.push({ name: 'Admin'})
      }).catch(error => {
        this.$store.commit('addAlert', { className: 'danger', content: 'Veuillez vérifier vos identifients' })
        console.error(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
