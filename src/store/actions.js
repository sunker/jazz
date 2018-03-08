import { firebaseAction } from 'vuexfire'

const setSerieRef = firebaseAction(({ bindFirebaseRef, dispatch }, ref) => {
  bindFirebaseRef('serie', ref, {
    wait: true,
    readyCallback: () => {
      dispatch('setCurrentRound')
    }
  })
})

const setCurrentRound = ({ state, commit, getters }) => {
  const rounds = state.serie.rounds.sort(function compare (a, b) {
    const dateA = new Date(a.created_at)
    const dateB = new Date(b.created_at)
    return dateA - dateB
  })
  return rounds && rounds.length > 0 ? rounds[0] : { sets: [] }
  // commit('updateScore', { id, playerId, step: step * -1 })
}

const increment = ({ commit, getters }, { id, step, playerId, max }) => {
  commit('updateScore', { id, playerId, step })
  const set = getters.currentRound.sets.find(x => x.id === id)
  const currentScore = Object.keys(set.score || {}).reduce((acc, curr) => (acc = acc + set.score[curr]), 0)
  if (currentScore === max) {
    commit('setCompleteSetStatus', { id, status: true })
    if (getters.currentRound.sets.every(x => x.complete)) {
      // Round finished!
    } else {
      const { id } = getters.currentRound.sets.find(x => !x.complete)
      commit('setSelectedSet', { id })
    }
  }
}

const decrement = ({ commit, getters }, { id, step, playerId }) => {
  commit('updateScore', { id, playerId, step: step * -1 })
  commit('setCompleteSetStatus', { id, status: false })
}

export default {
  setSerieRef,
  increment,
  decrement,
  setCurrentRound
}
