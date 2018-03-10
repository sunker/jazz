<template>
  <div style="width:100%">
    <round-finished-dialog></round-finished-dialog>
    <v-stepper v-model="currentStep" alt-labels>
      <v-stepper-header>
        <template v-for="(set, index) in sets">
            <v-stepper-step
              :key="set.name"
              edit-icon="check"
              :step="set.id"
              :complete="stepComplete(set)"
              :editable="stepEditable(set)">
              {{set.name}}
            </v-stepper-step>
            <v-divider v-if="index + 1 !== sets.length" v-bind:key="index"></v-divider>
      </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content
          :step="set.id"
          v-for="(set) in sets"
          :key="set.name">
          <template>
            {{set.name}}
            <v-layout justify-center column>
              <v-layout v-for="player in players" v-bind:key="player.id" align-center row spacer slot="header">
                <v-flex xs1>
                <v-avatar size="36px" slot="activator">
                  <v-icon>person</v-icon>
                </v-avatar>
              </v-flex>
              <v-flex xs3 class="text-xs-left" style="margin-left:5px;">
                <strong class="grey--text">{{player.name}}</strong>
              </v-flex>
                <v-btn :disabled="currentPlayerScore(set.id, player.id) === 0" color="secondary" outline @click="decrease(player, set)">
                  <v-icon dark>remove</v-icon>
                </v-btn>
                <v-btn @mousedown="increase(player, set)" :disabled="disableIncrementButton(set, player.id)" color="green" @click="increase(player, set)">
                  <v-icon color="white">add</v-icon>
                </v-btn>
                <v-flex xs1 class="text-xs-right" style="margin-left:5px;">
                  <strong class="" v-bind:style="{ fontSize: pointSize + 'px' }">{{currentPlayerScore(set.id, player.id)}}</strong>
                </v-flex>
              </v-layout>
            </v-layout>
          </template>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Queens from './Queens'
import RoundFinishedDialog from './RoundFinishedDialog'

export default {
  name: 'round',
  computed: {
    ...mapGetters(['players', 'currentRound']),
    pointSize() {
      switch (this.score) {
        case 3:
          return 14
        case 6:
          return 16
        case 9:
          return 18
        case 12:
          return 22
      }
    },
    currentStep: {
      get() {
        return !this.currentRound ? 1 : this.currentRound.sets.find(x => x.selected).id
      },
      set(value) {
        this.$store.commit('setSelectedSet', { id: value })
      }
    },
  },
  methods: {
    disableIncrementButton({ id, max }, playerId) {
      if (this.totalSetScore(id) === max) return true
    },
    currentPlayerScore(setId, playerId) {
      const set = this.currentRound.sets.find(x => x.id === setId)
      return !set.score
        ? 0
        : set.score.hasOwnProperty(playerId) ? set.score[playerId] : 0
    },
    totalSetScore(setId) {
      const set = this.currentRound.sets.find(x => x.id === setId)
      return Object.keys(set.score || {}).reduce((acc, curr) => (acc = acc + set.score[curr]), 0)
    },
    increase(player, { id, step, max }) {
      this.$store.dispatch('increment', { id, step, playerId: player.id, max })
    },
    decrease(player, { id, step }) {
      this.$store.dispatch('decrement', { id, step, playerId: player.id })
    },
    stepComplete({id, max}) {
      return this.currentRound ? this.currentRound.sets.find(x => x.id === id).complete : false
    },
    stepEditable({id, max}) {
      if (!this.currentRound) return false
      const previous = this.currentRound.sets.filter(x => x.id < id)
      return previous.every(x => x.complete)
    }
  },
  data() {
    return {
      // currentStep: !this.currentRound ? 1 : this.currentRound.sets.find(x => x.selected).id,
      pointsComplete: false,
      sets: [
        {
          id: 1,
          value: 3,
          name: 'Damer',
          max: 12,
          step: 3,
        },
        {
          id: 2,
          value: 3,
          name: 'Spader',
          max: 13,
          step: 1,
        },
        {
          id: 3,
          value: 6,
          name: 'Ruter kung',
          max: 12,
          step: 6,
        },
        {
          id: 4,
          value: 3,
          name: 'Rubbet',
          max: 37,
          step: 1,
        },
      ],
    }
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    },
  },
  components: { Queens, RoundFinishedDialog },
}
</script>

<style>
@media only screen and (max-width: 959px) {
  .stepper__label {
    display: block !important;
  }
}
</style>