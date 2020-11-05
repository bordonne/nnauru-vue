<template>
  <header>
    <h1>SOS Planète</h1>
    <button>X</button>
  </header>
  <nav>
    <a @click.prevent="currentScreen = Screen.Fiche" >Ma fiche</a>
    <a @click.prevent="currentScreen = Screen.Me" >Moi, {{ username }}</a>
    <a @click.prevent="currentScreen = Screen.Team" >Toutes les équipes</a>
  </nav>
  <section>
    <ScreenFiche v-if="currentScreen === Screen.Fiche"/>
    <ScreenMe v-else-if="currentScreen === Screen.Me" />
    <ScreenTeam v-else-if="currentScreen === Screen.Team" />
  </section>
</template>

<script>
import store from '../services/store.js'
import ScreenFiche from './ScreenFiche.vue'
import ScreenMe from './ScreenMe.vue'
import ScreenTeam from './ScreenTeam.vue'

// Enumeration for screens
const Screen = {
  Fiche:1,
  Me:2,
  Team:3
}

export default {
  name: 'MainScreen',
  data(){
    return {
      username:store.get('username'),
      currentScreen:Screen.Fiche,
      Screen,
    }
  },
  components: {
    ScreenFiche,
    ScreenMe,
    ScreenTeam
  }
}
</script>

<style scoped>

</style>
