export default {
  players: state => state.serie ? state.serie.players : [],
  currentRound: state => {
    if (!state.serie) {
      return null
    }

    const rounds = state.serie.rounds.sort(function compare (a, b) {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateA - dateB
    })
    return rounds && rounds.length > 0 ? rounds[0] : { sets: [] }
  },
  currentSet: state => {
    if (!state.serie) {
      return null
    }
    const round = state.serie.rounds.sort(function compare (a, b) {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateA - dateB
    })[0]
    return round.sets.find(x => x.selected)
  },
  roundHighScore: state => {
    if (!this.currentRound) return []
    const players = state.serie.players.reduce((idObject, curr) => {
      idObject[curr.id] = {
        name: curr.name,
        score: 0,
        id: curr.id
      }
      return idObject
    }, {})
    const score = this.currentRound.sets.reduce((sum, set) => {
      Object.keys(set.score).forEach(key => {
        sum[key].score = set.score[key] + sum[key].score
      })
      return sum
    }, players)
    console.log(Object.values(score).sort((x, y) => x.score > y.score))
    return Object.values(score).sort((x, y) => x.score > y.score)
    // const winner = highScore[0]
    // const loser = highScore[highScore.length - 1]
  }
}
