<template>
  <div class="menu">
    <div :class="['open-menu fa', displayMenu ? 'fa-close' : 'fa-bars']" @click="toggleMenu"></div>
    <div class="localize fa fa-globe" @click="localize"></div>
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
  data () {
    return {
      displayMenu: false
    }
  },
  methods: {
    toggleMenu () {
      this.displayMenu = this.displayMenu ? false : true
    },
    localize () {
      this.$store.commit('setPokemonMap', this.$store.getters.pokemonShow)
      this.$router.push({ name: 'Map' })
    },
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
  color: black;
  position: fixed;
  z-index: 2;
  width: 78px;
  height: 100vh;
  background: black;
  border-right: 2px solid #696969;
}

.open-menu,
.localize,
.home-button {
  color: black;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  text-align: center;
  line-height: 50px;
  scursor: pointer;
  background: white;
  margin: auto;
  float: left;
  margin: 15px 10px 0 10px;
  cursor: pointer;
}

.open-menu,
.home-button a {
  text-decoration: none;
  color: black;
}

.menu-open {
  border: 0;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 80px;
  background: white;
  overflow: hidden;
  transition: 0.3s ease-out width;
  width: 0;
}

.menu-open.isOpen {
  width: 500px;
  border: 2px solid  #696969;
  border-top: 0;
  border-bottom: 0;
  border-left: 0px;
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
  transition: 0.3s ease-out all;
}

.menu-list a:hover {
  color: black;
  margin-left: 5px;
}

@media screen and (max-width: 700px) {
  .isOpen {
    width: calc(100vw - 80px);
  }
}

</style>
