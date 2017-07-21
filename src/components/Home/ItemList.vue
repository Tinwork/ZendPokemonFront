<template>
  <div class="item-list">
    <div class="item-list-container">
      <div class="item-list-content">
        <div :key="pokemon" class="item" v-for="pokemon in pokemons" @click="setPokemonShow(pokemon.rank)">
          <div class="imgContainer">
            <img :src="src(pokemon)" alt="">
          </div>
          <h3>{{pokemon.name}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-list',
  computed: {
    pokemons() {
      return this.$store.getters.pokemons
    },

  },
  methods: {
    setPokemonShow: function (rank) {
      this.$store.commit('setPokemonShowWithRank', rank)
    },
    src: function (pokemon) {
      return pokemon.thumbnail
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item-list {
  margin: 0 0 50px 0;
  background: url(/static/gaming-pattern.png);
}

.item-list-container {
  margin: auto;
  max-width: 1500px;
}

.item-list-content {
  overflow: auto;
  clear: both;
}

.item {
  width: 22%;
  min-height: 200px;
  background: #eee;
  border: 1px solid #333;
  margin: 0px 4% 4% 0;
  float: left;
  text-align: center;

  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    padding: 20px;
  }

  h3 {
    text-align: center;
    min-height: 50px;
    margin: 0;
    padding: 2px 5px;
    background: #333;
    color: white;
    line-height: 50px;
  }

  &:nth-child(4n) {
    margin: 0 0 4% 0;
  }

  .imgContainer {
    min-height: 400px;
    position: relative;
  }
}

@media screen and (max-width: 1350px) {
  .item-list-container {
    max-width: calc(100% - 220px);
  }

  .item {
    width: 48%;
    margin: 0 4% 4% 0;
    cursor: pointer;
  }

  .item:nth-child(4n) {
    margin: inherit;
  }

  .item:nth-child(2n) {
    margin: 0 0 4% 0;
  }
}

@media screen and (max-width: 700px) {
  .item-list-container {
    max-width: calc(100% - 40px);
  }
}
</style>
