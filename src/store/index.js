import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import actions from './actions'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      serie: null,
      currentRound: null
    },
    getters,
    actions,
    mutations: {
      ...firebaseMutations,
      setRoundComplete: (state, { id, highScore, winner, loser }) => {
        const currentRound = state.serie.rounds.sort(function compare (a, b) {
          const dateA = new Date(a.created_at)
          const dateB = new Date(b.created_at)
          return dateA - dateB
        })[0]
        currentRound.complete = true
        currentRound.winner = winner
        currentRound.loser = loser
        currentRound.highScore = highScore
      },
      setSelectedSet: (state, { id }) => {
        const currentRound = state.serie.rounds.sort(function compare (a, b) {
          const dateA = new Date(a.created_at)
          const dateB = new Date(b.created_at)
          return dateA - dateB
        })[0]
        currentRound.sets.forEach(x => x.selected = false)
        const set = currentRound.sets.find(x => x.id === id)
        set.selected = true
      },
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
          // set.score[playerId] += step
          Vue.set(set.score, playerId, set.score[playerId] += step)
        } else {
          Vue.set(set.score, playerId, step)
          // set.score[playerId] = step
        }
        currentRound.highScore = [{ id: 1, name: 'röv', score: 2 }, { id: 2, name: 'röv2', score: 34 }]
        currentRound.complete = true
        currentRound.winner = 'winner'
        currentRound.loser = 'loser'
      }
    }
  })
}

export default createStore
