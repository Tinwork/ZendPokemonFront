<template>
  <div class="item-show">
    <div class="new-item">
      <h1>{{pokemon.name}}
        <span>, Rank : {{pokemon.rank}}</span>
      </h1>
      <div class="types">
        <div v-if="pokemon.type_id" class="type">{{ pokemon.type_id }}</div>
      </div>
  
      <img class="main-display" :src="src(pokemon)">
    </div>
  
    <div v-if="typeof pokemon.evolutions !== 'undefined'">
  
      <div class="sub-evol" v-if="pokemon.evolutions.sub_evolution">
        <div :key="evolution" v-for="evolution in pokemon.evolutions.sub_evolution" v-if="!Array.isArray(evolution)">
          <!--<img :src="evolution.thumbnail">-->
  
          <a @click="setPokemonShow(evolution)">
  
            <img src="https://css-tricks.com/wp-content/uploads/2014/05/align-items.svg">
  
          </a>
        </div>
      </div>
  
      <div class="post-evol" v-if="pokemon.evolutions.post_evolution">
        <div :key="evolution" v-for="evolution in pokemon.evolutions.post_evolution" v-if="!Array.isArray(evolution)">
  
          <a @click="setPokemonShow(evolution) ">
  
            <img src="https://css-tricks.com/wp-content/uploads/2014/05/align-items.svg">
  
          </a>
        </div>
      </div>
  
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'item-show',
  methods: {
    src(pokemon) {
      return pokemon.thumbnail
    },
    setPokemonShow(pokemon) {
      this.$store.commit('setPokemonShowWithRank', pokemon.rank)
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
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 50%;
  width: 50%;
  margin: auto;
}

.sub-evol,
.post-evol {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;

  height: 99vh;

  width: 25%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}


.sub-evol>div,
.post-evol>div {
  width: 100%;
  position: relative;
  max-height: 200px;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
  max-width: 200px;
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
  left: 0;
}

.sub-evol {
  right: 0;
}

img.main-display {
  width: 30vw;
  height: 30vw;
  max-width: 300px;
  max-height: 300px;
  border: 1px solid;
  border-radius: 50%;
  margin: 20px 0 0 0;
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
  background: gainsboro;
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
