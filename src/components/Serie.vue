<template>
  <div style="width:100%">
    <round></round>
    <!-- <serie-footer></serie-footer> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { db } from '../services/firebase'
import SerieFooter from './SerieFooter'
import Round from './Round'

export default {
  mounted: function() {
    this.$store.dispatch('setSerieRef', db.ref('series').child(this.serieId))
  },
  components: { Round, SerieFooter },
  props: ['serieId'],
  data() {
    return {}
  },
  computed: {
    ...mapState(['serie']),
    ...mapGetters(['players'])
  },
}
</script>

<style>
.stepper__content {
  padding-left: 2px !important;
  padding-right: 2px !important;
}
</style>