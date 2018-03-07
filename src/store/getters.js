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
  }
}
