<template>
  <form>
    <v-text-field label="Namn på tävling" v-model="name" 
      :error-messages="nameErrors" @input="$v.name.$touch()" 
      @blur="$v.name.$touch()" required></v-text-field>
    
    <div v-for="(player, index) in players" v-bind:key="index">
      <label class="left">Spelare {{index+1}}</label>
      <v-text-field label="Namn" v-model.trim="player.name"
        @input="$v.players.$each[index].name.$touch()"
        @blur="$v.players.$each[index].name.$touch()" required></v-text-field>
    </div>
    
    <div class="text-xs-left">
    <v-btn
      @click.native="addPlayer()"
      color="blue"
      class="white--text"
    >
      Lägg till spelare
      <v-icon right dark>add</v-icon>
    </v-btn>
    </div>
    <v-divider></v-divider>
    <div class="text-xs-left">
    <v-btn color="red" class="white--text" @click="clear">Rensa</v-btn>
    <v-btn
      :loading="loading"
      @click.native="submit"
      :disabled="name === '' || players[0].name === '' || players[1].name === ''"
      color="green"
      class="white--text">Starta tävling</v-btn>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import Round from '../models/Round'

export default {
  mixins: [validationMixin],
  data() {
    return {
      loader: null,
      loading: false,
      name: '',
      players: [{ name: '', id: 1 }, { name: '', id: 2 }],
    }
  },
  validations: {
    name: { required },
    players: {
      required,
      minLength: minLength(3),
      $each: {
        name: {
          required,
          minLength: minLength(2),
        },
      },
    },
  },
  methods: {
    addPlayer() {
      this.players.push({ name: '', id: this.players.length + 1 })
    },
    submit() {
      this.$v.$touch()
      this.loading = true
      this.loader = this.loading

      this.$root.$firebaseRefs.series
        .push({
          name: this.name,
          created_at: new Date().toISOString(),
          players: this.players,
          rounds: [new Round()],
        })
        .then(res => {
          this.$router.push({ name: 'Serie', params: { serieId: res['.key'] } })
        })
        .finally(() => {
          this.loading = false
        })
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.players = this.players.map(player => '')
    },
  },
  computed: {
    playerErrors(index) {
      const errors = []
      if (!this.$v.players.$each[index].name.$dirty) return errors
      !this.$v.players.$each[index].name.required &&
        errors.push('Spelaren måste ha ett namn')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Tävlingen måste ha ett namn')
      return errors
    },
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    },
  },
}
</script>

<style scoped>
form {
  margin-top: 20px;
}

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