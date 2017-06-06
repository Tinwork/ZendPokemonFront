<template>
  <div class="item-list">
    <div class="item-list-container">
      <div class="item-list-content">
        <div class="item" v-for="pokemon in pokemons" @click="setPokemonShow(pokemon.rank)">
          <img :src="pokemon.src" alt="">
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
    pokemons: function () {
      return this.$store.getters.pokemons
    }
  },
  methods: {
    setPokemonShow: function (rank) {
      this.$store.commit('setPokemonShowWithRank', rank)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-list {
  margin: 0 0 50px 0;
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
  background: gray;
  margin: 0px 4% 4% 0;
  float: left;
  text-align: center;
}

.item img {
  min-height: 150px;
}

.item h3 {
  text-align: center;
  min-height: 50px;
  margin: 2px 5px;
}

.item:nth-child(4n) {
  margin: 0 0 4% 0;
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
