<template>
  <v-data-table
    :headers="headers"
    :items="roundHighScore"
    hide-actions
    class="elevation-1"
  >
  {{roundHighScore}}
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id }}</td>
      <td class="text-xs-right">{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.score }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'round-high-score',
  computed: {
    ...mapGetters(['currentRound', 'roundHighScore']),
  },
  data() {
    return {
      // items: [
      //   { id: 1, name: 'röv', score: 2 },
      //   { id: 2, name: 'röv2', score: 34 },
      // ], // this.currentRound ? this.currentRound.highScore : [],
      items: this.roundHighScore,
      headers: [
        {
          text: 'Placering',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: 'Spelare', value: 'name', sortable: false },
        { text: 'Poäng', value: 'score', sortable: false },
      ],
    }
  },
}
</script>

