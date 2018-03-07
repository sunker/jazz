import { firebaseAction } from 'vuexfire'

const setSerieRef = firebaseAction(({ bindFirebaseRef }, ref) => {
  bindFirebaseRef('serie', ref, { wait: true })
})

const increment = ({ commit, getters }, { id, step, playerId, max }) => {
  commit('updateScore', { id, playerId, step })
  const set = getters.currentRound.sets.find(x => x.id === id)
  const currentScore = Object.keys(set.score || {}).reduce((acc, curr) => (acc = acc + set.score[curr]), 0)
  if (currentScore === max) {
    commit('setCompleteSetStatus', { id, status: true })
  }
}

const decrement = ({ commit, getters }, { id, step, playerId }) => {
  commit('updateScore', { id, playerId, step: step * -1 })
  commit('setCompleteSetStatus', { id, status: false })
}

export default {
  setSerieRef,
  increment,
  decrement
}
