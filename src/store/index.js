import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  pokemonShow: {},
  pokemonMap: {},
  pokemons: []
}

const mutations = {
  setPokemonShowWithId: function (state, id) {
    let i
    let tmp = state.pokemons.filter((pokemon, index) => {
      if (pokemon.id === id) {
        i = index
        return pokemon
      }
    })
    tmp.index = i
    state.pokemonShow = tmp
  },
  setPokemonshowWithIndex: function (state, index) {
    state.pokemonShow = state.pokemons[index]
    state.pokemonShow.index = index
  },
  setPokemonMap: function (state, pokemon) {
    state.pokemonMap = pokemon
  },
  setPokemons: function (state, array) {
    if (array.lenght !== 0) {
      state.pokemons = array
    }
  },
  filterById: function (state, comparaison) {
    let tmp
    switch (comparaison) {
      case 'more':
        tmp = state.pokemons.sort((a, b) => {
          return b.nbVotes - a.nbVotes
        })
        break
      case 'less':
        tmp = state.pokemons.sort((a, b) => {
          return a.nbVotes - b.nbVotes
        })
        break
    }
    state.pokemons = tmp
  },
  filterByName: function (state, comparaison) {
    let tmp
    switch (comparaison) {
      case 'asc':
        tmp = state.pokemons.sort((a, b) => {
          return b.title.localeCompare(a.title)
        })
        break
      case 'desc':
        tmp = state.pokemons.sort((a, b) => {
          return a.title.localeCompare(b.title)
        })
        break
    }
    state.pokemons = tmp
  }
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
