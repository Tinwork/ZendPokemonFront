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
  typeShowAdmin: undefined,
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
  typeShowAdmin: state => {
    return state.typeShowAdmin
  },
  rankPosible: state => {
    const n = 151
    const array = Array(n).fill().map(function(element, index) {
      return index++
    })

    if (state.pokemons.length > 0) {
      const pokemonRank = state.pokemons.map(pokemon => parseInt(pokemon.rank))
      return array.filter(int => {
        return !pokemonRank.includes(int)
      })
    } else {
      return array
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
