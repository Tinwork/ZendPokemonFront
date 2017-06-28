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
          <!--<img >-->
  
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
function shadeBlendConvert(p, from, to) {
  if (typeof (p) != "number" || p < -1 || p > 1 || typeof (from) != "string" || (from[0] != 'r' && from[0] != '#') || (typeof (to) != "string" && typeof (to) != "undefined")) return null; //ErrorCheck
  if (!this.sbcRip) this.sbcRip = function (d) {
    var l = d.length, RGB = new Object();
    if (l > 9) {
      d = d.split(",");
      if (d.length < 3 || d.length > 4) return null;//ErrorCheck
      RGB[0] = i(d[0].slice(4)), RGB[1] = i(d[1]), RGB[2] = i(d[2]), RGB[3] = d[3] ? parseFloat(d[3]) : -1;
    } else {
      if (l == 8 || l == 6 || l < 4) return null; //ErrorCheck
      if (l < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? d[4] + "" + d[4] : ""); //3 digit
      d = i(d.slice(1), 16), RGB[0] = d >> 16 & 255, RGB[1] = d >> 8 & 255, RGB[2] = d & 255, RGB[3] = l == 9 || l == 5 ? r(((d >> 24 & 255) / 255) * 10000) / 10000 : -1;
    }
    return RGB;
  }
  var i = parseInt, r = Math.round, h = from.length > 9, h = typeof (to) == "string" ? to.length > 9 ? true : to == "c" ? !h : false : h, b = p < 0, p = b ? p * -1 : p, to = to && to != "c" ? to : b ? "#000000" : "#FFFFFF", f = sbcRip(from), t = sbcRip(to);
  if (!f || !t) return null; //ErrorCheck
  if (h) return "rgb(" + r((t[0] - f[0]) * p + f[0]) + "," + r((t[1] - f[1]) * p + f[1]) + "," + r((t[2] - f[2]) * p + f[2]) + (f[3] < 0 && t[3] < 0 ? ")" : "," + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000 : t[3] < 0 ? f[3] : t[3]) + ")");
  else return "#" + (0x100000000 + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 255) : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255) * 0x1000000 + r((t[0] - f[0]) * p + f[0]) * 0x10000 + r((t[1] - f[1]) * p + f[1]) * 0x100 + r((t[2] - f[2]) * p + f[2])).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
}

export default {
  name: 'item-show',
  methods: {
    src(pokemon) {
      return pokemon.thumbnail
    },
    setPokemonShow(pokemon, eveny) {
      const originElement = event.srcElement.getBoundingClientRect()
      const mainElement = document.querySelector('.main-display').getBoundingClientRect()
      this.$store.commit('setPokemonShowWithRank', pokemon.rank)
    },
    gradient(pokemon) {
      if (typeof pokemon.type_id !== 'undefined' && pokemon.type_id.length !== 0) {
        switch (pokemon.type_id.length) {
          case 1:
            return `background: linear-gradient(${Math.floor(Math.random() * 360) + 1}deg, ${shadeBlendConvert(pokemon.type_id[0].color, -0.3)}, ${shadeBlendConvert(pokemon.type_id[0].color, 0.3)});`
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
