<template>
  <div class="map">
    <h1 class="map-title">Map</h1>
    <div class="map-content"></div>
    <div class="map-form">
      <select v-model="selectedPokemon" @change="changeSelectedPokemon($event)">
        <option v-for="pokemon in pokemonsList" v-bind:value="pokemon.id">
          {{ pokemon.name }}
        </option>
      </select>

      <div class="input">
        <label>Longitude</label>
        <input type="text" v-model="longitude">
      </div>
      <div class="input">
        <label>Latitude</label>
        <input type="text" v-model="latitude">
      </div>

      <button @click="addNewPokemon" :disabled="!selectedPokemon || !latitude || !longitude">Envoyer</button>
    </div>
  </div>
</template>

<script>
import ol from 'openlayers'

export default {
  name: 'map',
  data: function () {
    return {
      map: '',
      longitude: '',
      latitude: '',
      pokemonsIcons: ''
    }
  },
  computed: {
    selectedPokemon: function () {
      return this.$store.getters.pokemonMap.id
    },
    pokemonsList : function () {
      return this.$store.getters.pokemons
    },
  },
  methods: {
    initMap: function () {
      this.vectorSource = new ol.source.Vector();
      this.vectorLayer = new ol.layer.Vector({
        source: this.vectorSource
      });
      this.map = new ol.Map({
        layers: [
          new ol.layer.Tile(
            { source: new ol.source.OSM() }
          ), 
          this.vectorLayer
        ],
        target: document.querySelector(".map-content"),
        view: new ol.View({
          center: [0, 0],
          zoom: 3
        })
      });

      this.map.on("click", event => {
        this.longitude = event.coordinate[0]
        this.latitude = event.coordinate[1]
      })
    },
    changeSelectedPokemon: function (event) {
      let pokemon = this.pokemonsList.find(pokemon => pokemon.id === event.target.value)
      this.selectedPokemon = pokemon
      this.$store.commit('setPokemonMap', pokemon)
    },
    addNewPokemon: function () {
      if (this.longitude && this.latitude){
        let newPokemon = {
          coordinate: [this.longitude, this.latitude],
          src: this.$store.getters.pokemonMap.thumbnail
        }

        this.addPokemon(newPokemon)
        this.latitude = null
        this.longitude = null
      }
    },
    initPokemon: function () {
      this.pokemonsIcons = [
        { 
          coordinate:  [-3737464.9350319784, 2798206.731463732], 
          src: 'http://www.pokepedia.fr/images/7/72/Miniat_6_x_001.png' 
        }
      ]

      for (let pokemon of this.pokemonsIcons) {
        this.addPokemon(pokemon)
      }
    },
    addPokemon: function (pokemon) {
      const coordinates = new ol.geom.Point(pokemon.coordinate);
      let iconFeature = new ol.Feature({
        geometry: coordinates
      });
      iconFeature.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon ({
            src: pokemon.src || 'http://www.pokepedia.fr/images/7/72/Miniat_6_x_001.png'
          })
        })
      );
      this.vectorSource.addFeature(iconFeature);
    }
  },
  mounted: function () {
    this.initMap()
    this.initPokemon()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-title {
  position: absolute;
  left: 0;
  right: 0;
  top: 21px;
  text-align: center;
}

.map-form {
  position: absolute;
  top: 16vh;
  width: 350px;
  min-height: 100px;
  left: 11px;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid;
  background: white;
}

select {
  width: 100%;
  border: 1px solid;
  background: white;
}

.input {
  margin: 5px 0;
}

label {
  width: 25%;
  display: block;
  float: left;
  text-align: left;
}

input {
  width: 73%;
}

button {
  background: white;
  border: 1px solid;
  padding: 5px 10px;
  float: right;
}

.map-content {
  width: 100vw;
  height: 85vh;
  position: absolute;
  top: 15vh;
}
</style>
