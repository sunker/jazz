<template>
  <v-layout class="page" row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <v-divider></v-divider>
          <template v-for="(serie, index) in series">
            <v-list-tile
              avatar
              ripple
              router
              :to="{ name: 'Serie', params: { serieId: serie['.key'] }}"
              :key="index"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{serie.name}}</v-list-tile-title>
                <v-list-tile-sub-title class="grey--text text--darken-4">{{serie.players.map(x=>x.name).join(', ')}}</v-list-tile-sub-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>Senast uppdaterad {{serie.created_at.slice(0,10)}}</v-list-tile-action-text>
                <v-list-tile-action-text>Skapad {{serie.created_at.slice(0,10)}}</v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from '../services/firebase'

export default {
  firebase: {
    series: {
      source: db.ref('series'),
      cancelCallback(err) {
        console.error(err)
      },
    },
  },
  methods: {},
}
</script>

<style scoped>
.list {
  width: 100%;
  padding: 0;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>