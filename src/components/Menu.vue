<template>
  <div class="menu">
    <div :class="['open-menu fa', displayMenu ? 'fa-close' : 'fa-bars']" @click="toggleMenu"></div>
    <div :class="['menu-open', displayMenu ? 'isOpen' : '']">
      <div class="menu-list">
        <h3>Menu</h3>
        <router-link :to="{ name: 'Home' }" v-on:click.native="toggleMenu">Page d'accueil</router-link>
        <router-link :to="{ name: 'Home' }" v-on:click.native="toggleMenu">Pokemons</router-link>
        <router-link :to="{ name: 'Map' }" v-on:click.native="toggleMenu">Localiser un pokemon</router-link>
        <router-link :to="{ name: 'Admin' }" v-on:click.native="toggleMenu">Admininstrateur</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data: function () {
    return {
      displayMenu: false
    }
  },
  methods: {
    toggleMenu: function () {
      this.displayMenu = this.displayMenu ? false : true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  color: black;
  margin: 30px 0;
  font-size: 1.7em;
  text-transform: uppercase;
  font-weight: 700;
  border-bottom: 3px solid black;
  padding: 0 0 3px 0;  
}

.menu {
  color: #696969;
  position: fixed;
  z-index: 2;
  width: 80px;
  height: 100vh;
  background: #696969;
}

.open-menu,
.home-button {
  color: black;
  width: 50px;
  height: 50px;
  border: 1px solid #696969;
  text-align: center;
  line-height: 50px;
  scursor: pointer;
  background: white;
  margin: auto;
  float: left;
  margin: 15px 10px 0 10px;
}

.open-menu,
.home-button a {
  text-decoration: none;
  color: black;
}

.open-menu {
  cursor: pointer;
}

.menu-open {
  position: fixed;
  height: 100vh;
  top: 0;
  left: 80px;
  border: 1px solid #696969;
  border-top: 0;
  border-bottom: 0;
  background: white;
  overflow: hidden;
  transition: 0.3s ease-out width;
  width: 0;
}

.menu-open.isOpen {
  width: 500px;
}

.close-menu {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
}

.menu-list {
  margin: 10px 50px;
  text-align: left;
}

.menu-list a {
  clear: both;
  width: 100%;
  float: left;
  margin: 5px 0;
  color: #696969;
  text-decoration: none;
  min-width: 400px;
  transition: 0.3 ease-out all;
}

.menu-list a:hover {
  color: black;
  margin-left: 5px;
}

@media screen and (max-width: 700px) {
  .menu-open {
    width: 100vw;
  }
}

</style>
