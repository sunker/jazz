<template>
  <div style="width:100%">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="(set, index) in sets">
            <v-stepper-step
              :key="set.name"
              :step="set.name"
              :complete="stepComplete(set)"
              editable>
            </v-stepper-step>
            <v-divider v-if="index + 1 !== sets.length" v-bind:key="index"></v-divider>
      </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content
          :step="set.name"
          v-for="(set, index) in sets"
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
                <v-flex xs4 class="text-xs-left" style="margin-left:5px;">
                  <strong class="grey--text">{{player.name}}</strong>
                </v-flex>
                  <v-btn :disabled="currentPlayerScore(set.id, player.id) === 0" color="secondary" outline @click="decrease(player, set)">
                    <v-icon dark>remove</v-icon>
                  </v-btn>
                  <v-btn :disabled="disableIncrementButton(set, player.id)" color="green" @click="increase(player, set)">
                    <v-icon color="white">add</v-icon>
                  </v-btn>

                <v-flex xs1 class="text-xs-right" style="margin-left:5px;">
                  <strong class="grey--text" v-bind:style="{ fontSize: pointSize + 'px' }">{{currentPlayerScore(set.id, player.id)}}</strong>
                </v-flex>
              </v-layout>
            </v-layout>
          </template>
          <v-btn color="primary" @click="nextStep(index+1)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Queens from './Queens'

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
    }
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
      console.log(this.currentRound)
      // return false
      return this.currentRound ? this.currentRound.sets.find(x => x.id === id).complete : false
    }
  },
  data() {
    return {
      e1: 'Damer',
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
    // set.score
  },
  components: { Queens },
}
</script>

<style>
.input-group--slider {
  margin-top: 10px;
}

.slider__thumb {
  width: 40px !important;
  height: 40px !important;
}

.input-group__input {
  padding-right: 20px;
}

.stepper__wrapper {
  height: 100% !important;
}

.stepper__wrapper slot {
  margin-bottom: 20px !important;
}

.layout .slot .align-center .row .spacer {
  margin-bottom: 20px;
}
</style>