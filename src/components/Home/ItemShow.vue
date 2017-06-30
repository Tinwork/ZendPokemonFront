<template>
  <div class="item-show" :style="gradient(pokemon)">
    <div class="new-item">
      <h1>{{pokemon.name}}
        <span>, Rank : {{pokemon.rank}}</span>
      </h1>
      <div class="types" v-if="pokemon.type_id">
        <img class="type" :key="t" v-for="t in pokemon.type_id" :src="t.badge_path">
      </div>
  
      <img class=" main-display " :src="src(pokemon) ">
    </div>
  
    <div v-if="typeof pokemon.evolutions !=='undefined' ">
  
      <div class="sub-evol " v-if="pokemon.evolutions.sub_evolution ">
        <div :key="evolution " v-for="evolution in pokemon.evolutions.sub_evolution " v-if="!Array.isArray(evolution) ">
          <a @click="setPokemonShow(evolution) ">
            <img :src="evolution.thumbnail ">
          </a>
        </div>
      </div>
  
      <div class="post-evol " v-if="pokemon.evolutions.post_evolution ">
        <div :key="evolution " v-for="evolution in pokemon.evolutions.post_evolution " v-if="!Array.isArray(evolution) ">
          <a @click="setPokemonShow(evolution) ">
            <img :src="evolution.thumbnail ">
          </a>
        </div>
      </div>
  
    </div>
  
  </div>
</template>

<script>
var Color = require('color');

export default {
  name: 'item-show',
  methods: {
    src(pokemon) {
      return pokemon.thumbnail
    },
    setPokemonShow(pokemon, eveny) {
      const { top, width, height, left } = event.srcElement.getBoundingClientRect()
      const mainElement = document.querySelector('.main-display')
      mainElement.style.margin = 'initial'
      mainElement.style.left = mainElement.getBoundingClientRect().left
      mainElement.style.top = `${top}px`
      mainElement.style.left = `${left}px`
      mainElement.style.width = `${width}px`
      mainElement.style.height = `${height}px`
      mainElement.style.opacity = 0

      setTimeout(() => {
        mainElement.style.top = null
        mainElement.style.left = null
        mainElement.style.width = null
        mainElement.style.height = null
        mainElement.style.opacity = null
        mainElement.style.margin = null
        this.$store.commit('setPokemonShowWithRank', pokemon.rank)
      }, 500)
    },
    gradient(pokemon) {
      if (typeof pokemon.type_id !== 'undefined' && pokemon.type_id.length !== 0) {
        switch (pokemon.type_id.length) {
          case 1:
            var light = Color(pokemon.type_id[0].color).lighten(0.3).rgb().string()
            var dark = Color(pokemon.type_id[0].color).darken(0.3).rgb().string()
            return `background: linear-gradient(${Math.floor(Math.random() * 360) + 1}deg, ${light}, ${dark});`
            break
          case 2:
            return `background: linear-gradient(${Math.floor(Math.random() * 360) + 1}deg, ${pokemon.type_id[0].color}, ${pokemon.type_id[1].color});`
            break
        }
      }
    }
  },
  computed: {
    pokemon() {
      return this.$store.getters.pokemonShow || {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-item {

  clear: both;
  overflow: auto;
  left: 0;
  right: 0;
  margin: 10vh auto;
  min-height: 500px;
  height: 50%;
  width: 50%;
  padding: 20px;
  background: white;
  border-radius: 10px;

  box-shadow: 1px 1px 18px 0px black;
}

.sub-evol,
.post-evol {
  position: absolute;
  margin: auto;
  bottom: 10vh;
  height: 20vh;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}


.sub-evol>div,
.post-evol>div {
  position: relative;
  height: 100%;
  max-height: 200px;
  max-width: 200px;
  width: 100%;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
  cursor: pointer;
  border: 1px solid black;
  transition: .1s border ease-in-out;
}


.sub-evol>div:hover,
.post-evol>div:hover {
  border: 5px solid black;
}


.sub-evol img,
.post-evol img {
  width: 100%;
  height: 100%;
}

.post-evol {
  right: 0;
}

.sub-evol {
  left: 0;
}

img.main-display {

  transition: all .5s ease-in-out;
  width: 30vw;
  height: 30vw;
  max-width: 300px;
  max-height: 300px;
  margin: initial;
  position: absolute;
  left: calc(50% - 150px);
  top: 25vh;
}

h1 span {
  font-size: 0.7em;
  color: gray;
}

.item-show {
  position: relative;
  overflow: auto;
  border-bottom: 3px solid;
  min-height: 100vh;
}

.navigation {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  cursor: pointer;
}

.type {
  padding: 5px 20px;
  border: 0px solid black;
  border-radius: 15px;
  font-size: 0.8em;
  display: inline-block;
}

.types {
  text-align: center;
}

.navigation.left {
  left: 20px;
}

.navigation.right {
  right: 20px;
}

.item-show-container {
  border: 3px solid;
  box-sizing: border-box;
  padding: 20px;
  max-width: 1100px;
  margin: 40px auto;
}

.item-show-content {
  clear: both;
  overflow: auto;
  min-height: 400px;
}

.item-show-content h1 {
  margin: 0.67em 0 1em;
}

.item-show-content-right {
  width: 65%;
  height: 100%;
  float: left;
  min-height: 400px;
  text-align: left;
  box-sizing: border-box;
  padding: 0 30px;
}

.item-show-content-left {
  width: 35%;
  height: 100%;
  float: left;
  min-height: 400px;
}

.item-show-content-left img {
  min-height: 400px;
  width: 100%;
}

.item-show-content-evolution img {
  width: 50px;
  height: 50px;
  margin: 0 10px;
}

.item-show-content-evolution img:first-child {
  width: 50px;
  height: 50px;
  margin: 0;
}

@media screen and (max-width: 1350px) {
  .item-show-container {
    max-width: calc(100% - 220px);
  }
}


@media screen and (max-width: 700px) {
  .item-show-container {
    max-width: calc(100% - 40px);
    margin: 100px auto 80px;
  }

  .navigation {
    bottom: 15px;
    top: inherit;
  }
}
</style>
