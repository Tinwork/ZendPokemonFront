<template>
  <div class="item-show">
    <a class="navigation left fa fa-angle-left" @click="prevPokemon"></a>
    <a class="navigation right fa fa-angle-right" @click="nextPokemon"></a>
    <div class="item-show-container">
      <h1>{{pokemon.name}}</h1>
      <div class="item-show-content">
        <div class="item-show-content-left">
          <img :src="src(pokemon)">
        </div>
        <div class="item-show-content-right">
          Id: {{pokemon.rank}}
          <div class="item-show-content-evolution" v-if="pokemon.evolutions">
            <h3>Evolutions</h3>
            
            <div v-if="pokemon.evolutions.sub_evolution">
              <div v-for="evolution in pokemon.evolutions.sub_evolution" v-if="evolution[0]">
                <h4>Subevolution</h4>
                 <a @click="setPokemonShow(evolution[0])">{{evolution[0].name}}</a>
              </div>
            </div>

            <div v-if="pokemon.evolutions.post_evolution">
              <div v-for="evolution in pokemon.evolutions.post_evolution" v-if="evolution[0]">
                <h4>Postevolution</h4>
                <a @click="setPokemonShow(evolution[0])">{{evolution[0].name}}</a>
              </div>
            </div>

          </div>
          <div class="item-show-content-localization">
            <h3 @click="localize">Localiser ce pokemon</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-show',
  methods: {
    nextPokemon: function () {
      let index = this.$store.state.pokemonShow.index + 1
      if (this.$store.getters.pokemons[index]) {
        this.$store.commit('setPokemonshowWithIndex', index)
      } else {
        this.$store.commit('setPokemonshowWithIndex',  0)
      }
    },
    prevPokemon: function () {
      let index = this.$store.state.pokemonShow.index - 1
      if (this.$store.getters.pokemons[index]) {
        this.$store.commit('setPokemonshowWithIndex', index)
      } else {
        this.$store.commit('setPokemonshowWithIndex', this.$store.getters.pokemons.length - 1)
      }
      
    },
    localize: function () {
      this.$store.commit('setPokemonMap', this.pokemon)
      this.$router.push({ name: 'Map' })
    },
    src: function (pokemon) {
      return "http://52.48.251.229" + pokemon.thumbnail
    },
    setPokemonShow: function (pokemon) {
      this.$store.commit('setPokemonShowWithRank', pokemon.rank)
    }
  },
  computed: {
    pokemon: function () {
      return this.$store.getters.pokemonShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-show {
  position: relative;
  overflow: auto;
  border-bottom: 3px solid;
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
