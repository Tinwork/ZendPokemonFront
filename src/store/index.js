import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  pokemonShow: {},
  pokemonShowAdmin: undefined,
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
  pokemonShowAdmin: state => {
    return state.pokemonShowAdmin
  },
  pokemons: state => {
    return state.pokemons
  },
  alerts: state => {
    return state.alerts
  },
  types: state => {
    return state.types
  },
  rankPosible: state => {
    const n = 151
    const array = Array(n).fill().map(function(element, index) {
      let obj = {
        disabled: false,
        value: index + 1
      }
      return obj
    })
    if (state.pokemons.length > 0) {
      state.pokemons.map(({ rank }) => {
        array[rank - 1].disabled = true
      })
    }
    return array
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
