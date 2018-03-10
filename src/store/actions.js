import { firebaseAction } from 'vuexfire'

const setSerieRef = firebaseAction(({ bindFirebaseRef, dispatch, state }, ref) => {
  bindFirebaseRef('serie', ref, {
    wait: true,
    readyCallback: () => {
      state.serie.name = 'mm'
    },
    errorCallback: (error) => {
      console.error(error)
    },
  })
})

const setCurrentRound = ({ state, commit, getters }) => {
  const rounds = state.serie.rounds.sort(function compare (a, b) {
    const dateA = new Date(a.created_at)
    const dateB = new Date(b.created_at)
    return dateA - dateB
  })
  return rounds && rounds.length > 0 ? rounds[0] : { sets: [] }
}

const roundComplete = ({ state, commit, getters }) => {
  const players = state.serie.players.reduce((idObject, curr) => {
    idObject[curr.id] = {
      name: curr.name,
      score: 0,
      id: curr.id
    }
    return idObject
  }, {})
  const score = getters.currentRound.sets.reduce((sum, set) => {
    Object.keys(set.score).forEach(key => {
      sum[key].score = set.score[key] + sum[key].score
    })
    return sum
  }, players)
  const highScore = Object.values(score).sort((x, y) => x.score > y.score)
  const winner = highScore[0]
  const loser = highScore[highScore.length - 1]
  commit('setRoundComplete', { id: getters.currentRound.id, highScore, winner, loser })
}

const increment = ({ commit, getters, dispatch }, { id, step, playerId, max }) => {
  commit('updateScore', { id, playerId, step })
  const set = getters.currentRound.sets.find(x => x.id === id)
  const currentScore = Object.keys(set.score || {}).reduce((acc, curr) => (acc = acc + set.score[curr]), 0)
  if (currentScore === max) {
    commit('setCompleteSetStatus', { id, status: true })
    if (getters.currentRound.sets.every(x => x.complete)) {
      dispatch('roundComplete')
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
  setCurrentRound,
  roundComplete
}
