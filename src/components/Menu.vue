<template>
  <div class="menu">
    <div class="home-button">
      <router-link to="home">Home</router-link>
    </div>
    <div class="open-menu" @click="toggleMenu">Menu</div>
    <div class="menu-open" v-if="displayMenu">
      <div class="close-menu" @click="toggleMenu">X</div>

      <div class="menu-list">
        <h3>Menu</h3>
        <router-link to="home" v-on:click.native="toggleMenu">Page d'accueil</router-link>
        <router-link to="home" v-on:click.native="toggleMenu">Pokemons</router-link>
        <router-link to="map" v-on:click.native="toggleMenu">Localiser un pokemon</router-link>
        <a v-on:click.native="toggleMenu">Admininstrateur</a>
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

.menu {
  position: relative;
  z-index: 2;
}

.open-menu,
.home-button {
  position: absolute;
  
  top: 20px;
  width: 50px;
  height: 50px;
  border: 1px solid;
  text-align: center;
  line-height: 50px;
}

.home-button {
  left: 30px;
}

.open-menu {
  right: 30px;
}

.menu-open {
  position: fixed;
  height: 100vh;
  top: 0;
  right: 0;
  min-width: 500px;
  border: 1px solid black;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  background: white;
}

.close-menu {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
}

.menu-list {
  margin: 70px 50px;
  text-align: left;
}

.menu-list a {
    clear: both;
    width: 100%;
    float: left;
    margin: 5px 0;
    color: black;
    text-decoration: none;
}

@media screen and (max-width: 700px) {
  .menu-open {
    width: 100vw;
  }
}

</style>
