<template>
  <div class="map">
    <h1 class="map-title">Map</h1>
    <div class="map-content"></div>
    <div class="menu-open map-form">
      <div class="menu-list">
        <h3>Localiser</h3>
        <select v-model="selectedPokemon" @change="changeSelectedPokemon($event)">
          <option :key="pokemon" v-for="pokemon in pokemonsList" v-bind:value="pokemon.id">
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
  </div>
</template>

<script>
import ol from 'openlayers'

export default {
  name: 'map',
  data() {
    return {
      map: '',
      longitude: '',
      latitude: '',
      pokemonsIcons: ''
    }
  },
  computed: {
    selectedPokemon() {
      return this.$store.getters.pokemonMap.id
    },
    pokemonsList() {
      return this.$store.getters.pokemons
    },
  },
  methods: {
    initMap() {
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
        const lonlat = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        this.longitude = lonlat[0]
        this.latitude = lonlat[1]
      })
    },
    changeSelectedPokemon: function (event) {
      let pokemon = this.pokemonsList.find(pokemon => pokemon.id === event.target.value)
      this.selectedPokemon = pokemon
      this.$store.commit('setPokemonMap', pokemon)
    },
    addNewPokemon() {
      if (this.longitude && this.latitude) {
        const pok = this.$store.getters.pokemonMap
        const formData = new FormData()
        
        let data = JSON.stringify({
          body: {
            longitude: this.longitude,
            latitude: this.latitude
          }
        })
        this.longitude = this.latitude = undefined
        formData.append('data', data);
        this.$http.post(`${window.API}/api/geo/pokemons/${pok.id}`, formData).then(response => {
          if (response.data.code === 200) {
            let newPokemon = {
              coordinate: [this.latitude, this.longitude]
            }
            this.update()
          } else {
            console.error(response)
          }
        }).catch(console.error)
      }
    },
    update() {
      this.$http.get(`${window.API}/api/geo/pokemons?long=48.8246&lat=2.56619&r=10000`).then(response => {
        const pokemonsIcons = response.data.response.result.collection
        for (let p of Object.entries(pokemonsIcons)) {
          this.addPokemon(p[1].pokemon)
        }
      }).catch(console.error)
    },
    initPokemon() {
      this.update()
    },
    addPokemon (pokemon) {
      let { icon, position } = pokemon
      if (position) {
        let style = new ol.style.Style({
          image: new ol.style.Icon({
            src: icon
          })
        })
        for (let { latitude, longitude } of position) {
          const lontlat = ol.proj.transform([parseInt(longitude), parseInt(latitude)], 'EPSG:4326','EPSG:3857');
          let iconFeature = new ol.Feature({
            geometry: new ol.geom.Point([parseInt(lontlat[0]), parseInt(lontlat[1])])   
          })
          iconFeature.setStyle(style)
          this.vectorSource.addFeature(iconFeature);
        }
      }
      
    }
  },
  mounted() {
    this.initMap()
    this.initPokemon()
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

.map {
  max-width: calc(100vw - 80px);
  margin-left: 80px;
}

.map-title {
  position: absolute;
  width: 100px;
  right: 0;
  top: 25px;
  text-align: center;
  max-width: calc(100vw - 80px);
  left: 80px;
  margin: auto;
  color: black;
  font-size: 1.7em;
  text-transform: uppercase;
  font-weight: 700;
  border-bottom: 3px solid black;
  padding: 0 0 3px 0;
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
  width: calc(100vw - 80px);
  left: 80px;
  height: 89vh;
  position: absolute;
  top: 11vh;
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
  border: 2px solid #696969;
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
    width: calc(100vw - 80px) !important;
  }
}
</style>
