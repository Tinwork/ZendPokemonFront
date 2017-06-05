<template>
  <div class="map">
    <h1>Map</h1>
    <div class="map-content"></div>
  </div>
</template>

<script>
import ol from 'openlayers'

export default {
  name: 'map',
  data: function () {
    return {
      map: '',
      pokemons: ''
    }
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
    },
    initPokemon: function () {
      this.pokemons = [
        { 
          coordinate:  [-3737464.9350319784, 2798206.731463732], 
          src: 'http://www.pokepedia.fr/images/7/72/Miniat_6_x_001.png' 
        }
      ]

      for (let pokemon of this.pokemons) {
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
            src: pokemon.src
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
.map-content {
  width: 100vw;
  height: 85vh;
  position: absolute;
  top: 15vh;
}
</style>
