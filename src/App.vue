<template>
<v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      right
      app
    >
      <v-list dense>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app>
      <v-toolbar-title>Jazz<v-icon style="margin-left:5px">music_note</v-icon></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container class="container" fluid fill-height>
        <v-layout column justify-top align-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="blue" app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import('../node_modules/vuetify/dist/vuetify.min.css')
export default {
  name: 'app',
  data: () => ({
    drawer: null,
    items: [
      { icon: 'home', title: 'Hem', to: '/' },
      {
        icon: 'add',
        title: 'Ny serie',
        to: '/skapa-ny',
      },
      {
        icon: 'list',
        title: 'Pågående serier',
        to: '/serier',
      },
    ],
  }),
  methods: {
    hideMenu: function() {
      document
        .getElementsByClassName('mdl-layout__drawer')[0]
        .classList.remove('is-visible')
      document
        .getElementsByClassName('mdl-layout__obfuscator')[0]
        .classList.remove('is-visible')
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 0;
}

.page {
  width: 100%;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

@media only screen and (max-width: 599px) {
  .container {
    padding: 8px !important;
  }
}
</style>
