import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import actions from './actions'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      serie: null
    },
    getters,
    actions,
    mutations: {
      ...firebaseMutations,
      setCompleteSetStatus: (state, { id, status }) => {
        const currentRound = state.serie.rounds.sort(function compare (a, b) {
          const dateA = new Date(a.created_at)
          const dateB = new Date(b.created_at)
          return dateA - dateB
        })[0]
        const set = currentRound.sets.find(x => x.id === id)
        set.complete = status
      },
      updateScore: (state, { id, playerId, step }) => {
        const currentRound = state.serie.rounds.sort(function compare (a, b) {
          const dateA = new Date(a.created_at)
          const dateB = new Date(b.created_at)
          return dateA - dateB
        })[0]
        const set = currentRound.sets.find(x => x.id === id)
        set.score = set.score || {}
        if (set.score.hasOwnProperty(playerId)) {
          set.score[playerId] += step
        } else {
          set.score[playerId] = step
        }
      }
    }
  })
}

export default createStore
