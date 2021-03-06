import uuid from 'node-uuid'

const mutations = {
  setPokemonShowAdmin: function(state, pokemon) {
    state.pokemonShowAdmin = pokemon
  },
  setTypeShowAdmin(state, type) {
    state.typeShowAdmin = type
  },
  setPokemonShowWithRank: function(state, rank) {
    let i
    let tmp = state.pokemons.filter((pokemon, index) => {
      if (pokemon.rank === rank) {
        i = index
        return pokemon
      }
    })
    tmp.index = i
    state.pokemonShow = tmp[0]
  },
  setPokemonshowWithIndex: function(state, index) {
    state.pokemonShow = state.pokemons[index]
    state.pokemonShow.index = index
  },
  setPokemonMap: function(state, pokemon) {
    state.pokemonMap = pokemon
  },
  setPokemons: function(state, array) {
    if (array.lenght !== 0) {
      state.pokemons = array
    }
  },
  filterById: function(state, comparaison) {
    let tmp
    switch (comparaison) {
      case 'more':
        tmp = state.pokemons.sort((a, b) => {
          return b.rank - a.rank
        })
        break
      case 'less':
        tmp = state.pokemons.sort((a, b) => {
          return a.rank - b.rank
        })
        break
    }
    state.pokemons = tmp
  },
  filterByName: function(state, comparaison) {
    let tmp
    switch (comparaison) {
      case 'asc':
        tmp = state.pokemons.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
        break
      case 'desc':
        tmp = state.pokemons.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
        break
    }
    state.pokemons = tmp
  },
  addAlert: function(state, { content, className }) {
    const alert = {
      className,
      content,
      id: uuid.v4()
    }
    state.alerts.push(alert)
    setTimeout(() => {
      mutations.deleteAlert(state, alert)
    }, 3500)
  },
  deleteAlert: function(state, alertToRemove) {
    state.alerts = state.alerts.filter(alert => alert.id !== alertToRemove.id)
  },
  setToken: function(state, token) {
    state.token = token
  },
  setTypes: function(state, array) {
    state.types = array
  }
}

export default mutations
