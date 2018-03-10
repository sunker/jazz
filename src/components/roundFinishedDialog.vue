<template>
     <v-dialog v-if="currentRound.complete" v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Grattis {{this.currentRound.winner.name}}, du vann!</v-card-title>
        <v-card-text>
          {{this.currentRound.highScore}}
          <round-high-score></round-high-score>
          <!-- <template>
            <v-data-table
              :headers="headers"
              :items="items"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.score }}</td>
              </template>
            </v-data-table>
          </template> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import RoundHighScore from './RoundHighScore'

export default {
  name: 'round-finished-dialog',
  computed: {
    ...mapGetters(['currentRound']),
    dialog: {
      get() {
        return !this.currentRound ? false : this.currentRound.complete
      },
      set(value) {
        // this.$store.commit('setSelectedSet', { id: value })
        console.log(value)
      },
    },
  },
  data() {
    return {
      items: [
        { id: 1, name: 'röv', score: 2 },
        { id: 2, name: 'röv2', score: 34 },
      ], // this.currentRound ? this.currentRound.highScore : [],
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
  components: { RoundHighScore },
}
</script>

