<template>
  <v-card height="200px">
    <v-bottom-nav
      absolute
      shift
      :value="true"
      :active.sync="e2"
      color="blue"
    >
      <v-btn dark>
        <span>Ställning</span>
        <v-icon>assessment</v-icon>
      </v-btn>
      <v-btn dark>
        <span>Music</span>
        <v-icon>music_note</v-icon>
      </v-btn>
      <v-btn dark>
        <span>Book</span>
        <v-icon>book</v-icon>
      </v-btn>
      <v-btn dark>
        <span>Image</span>
        <v-icon>image</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      e2: 3,
    }
  }
}
</script>