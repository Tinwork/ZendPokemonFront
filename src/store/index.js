import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  pokemonShow: {},
  pokemonMap: {},
  pokemons: [],
  alerts: [],
  types: [],
  token: undefined
}

const getters = {
  pokemonMap: state => {
    return state.pokemonMap
  },
  pokemonShow: state => {
    return state.pokemonShow
  },
  pokemons: state => {
    return state.pokemons
  },
  alerts: state => {
    return state.alerts
  },
  types: state => {
    return state.types
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
