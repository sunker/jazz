<template>
    <div>
      Queens
      <v-layout justify-center column>
        <v-layout v-for="player in players" align-center row spacer slot="header">
          <v-flex xs1>
            <v-avatar size="36px" slot="activator">
              <v-icon>person</v-icon>
            </v-avatar>
          </v-flex>
          <v-flex xs2 class="text-xs-left" style="margin-left:5px;">
            <strong class="grey--text">{{player.name}}</strong>
          </v-flex>
            <v-btn dark color="secondary" outline>
              <v-icon dark>remove</v-icon>
            </v-btn>
            <v-btn dark color="green">
              <v-icon dark>add</v-icon>
            </v-btn>
          <!-- </v-flex> -->
          <!-- <v-flex>
            <v-slider v-model="set.step" thumb-label :step="set.step" min="0" :max="set.max" ticks></v-slider>
          </v-flex>
          <v-flex xs1 class="text-xs-left" style="margin-left:5px;">
            <v-text-field  v-model="set.step"  type="number" v-bind:style="{ fontSize: pointSize + 'px' }"></v-text-field>
            <strong v-model="set.step"  type="number" v-bind:style="{ fontSize: pointSize + 'px' }">{{set.value}}</strong>
          </v-flex> -->
        </v-layout>
      </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Queens',
  data() {
    return {
      e6: 1,
      score: 0,
      e1: 1,
      steps: 4,
    }
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    },
  },
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
  },
  methods: {
    onInput(val) {
      this.steps = parseInt(val)
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    },
  },
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