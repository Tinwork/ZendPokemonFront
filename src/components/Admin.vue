<template>
  <div class="admin">
    <MenuAdmin></MenuAdmin>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuAdmin from './Admin/MenuAdmin'

export default {
  name: 'admin',
  components: {
    MenuAdmin
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  background: white;
  z-index: 11;
  min-height: 100vh;
}
</style>
