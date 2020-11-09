<template>
  <div id="mainscreen">
  <header class="w3-display-container">
    <div class="app-title">
      <h1 class="w3-display-topleft">{{ $t("app_title") }}</h1>
    </div>
    <button class="w3-display-topright w3-button w3-ripple w3-circle w3-red w3-display-container" @click.prevent="logout">
      <img class="w3-display-middle" src="../assets/img/ico_cross.svg" />
    </button>
  </header>
  <!-- Nav -->
  <nav class="w3-sidebar w3-top">
    <a @click.prevent="currentScreen = Screen.Fiche" style="margin-bottom:40px"
    :class="{active: (currentScreen === Screen.Fiche)}">{{ $t("nav.fiche") }}</a>
    <a @click.prevent="currentScreen = Screen.Me"
    :class="{active: (currentScreen === Screen.Me)}">{{ $t("nav.me") }} {{ username }}</a>
    <a @click.prevent="currentScreen = Screen.Team"
    :class="{active: (currentScreen === Screen.Team)}">{{ $t("nav.team") }}</a>
    <a @click.prevent="currentScreen = Screen.Impact"
    :class="{active: (currentScreen === Screen.Impact)}">{{ $t("nav.impact") }}</a>
  </nav>

  <div class="content-wrapper">
    <!-- Header -->
    <div id="header-img" class="">
    </div>
    <!-- Page Content -->
    <div id="page-content" class="">
      <ScreenFiche v-if="currentScreen === Screen.Fiche"/>
      <ScreenMe v-else-if="currentScreen === Screen.Me" />
      <ScreenTeam v-else-if="currentScreen === Screen.Team" />
      <ScreenImpact v-else-if="currentScreen === Screen.Impact" />
    </div>
  </div>
  </div>
</template>

<script>
import store from '../services/store.js'
import ScreenFiche from './ScreenFiche.vue'
import ScreenMe from './ScreenMe.vue'
import ScreenTeam from './ScreenTeam.vue'
import ScreenImpact from './ScreenImpact.vue'

// Enumeration for screens
const Screen = {
  Fiche:1,
  Me:2,
  Team:3,
  Impact:4
}

export default {
  name: 'MainScreen',
  data(){
    return {
      username:store.get('username'),
      currentScreen:Screen.Fiche,
      Screen,
      store
    }
  },
  methods: {
    logout(e) {
      if(confirm(this.$t("confirm_logout"))) {
          this.store.set('loggedIn', false)
          this.store.set('username', "")
          this.store.set('credentials', "")
          this.$emit('login', false);
      }
    }
  },
  components: {
    ScreenFiche,
    ScreenMe,
    ScreenTeam,
    ScreenImpact
  }
}
</script>

<style lang="scss" scoped>

@font-face {
  font-family: $title-font-face;
  src: url($title-font-face-url) format('truetype');
}

#mainscreen {
  @include full-window();
  background-color: $mainscreen-bg-color;
}

h1 {
  font-family: $title-font-face;
  font-size: 58px;
  margin-left: 20px;
}

header {
  z-index: 10;
}

header button {
  height: 40px;
  width: 40px;
  font-weight: bolder;
  font-family: Arial;
  margin: 20px;
  box-shadow: $button-drop-shadow;
}

header button img {
  height: 17px;
  width: 17px;
}

nav {
  width: 8vw;
  margin-top: 16vh;
  margin-left: 1vw;
  background: none;
}

nav a {
  display: block;
  height: 7vw;
  width: 7vw;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #f5f6e6;
  box-shadow: $button-drop-shadow;
}

nav a.active {
  background-color: #f1dfbc;
}

#content-wrapper {
  height: 100%;
}

#header-img {
  position: fixed;
  top:0px;
  background-image: url("../assets/img/mainscreen_header.png");
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 92% auto;
  height: 20%;
  width: 100%;
}

#page-content {
  box-shadow: $card-drop-shadow;
  border-radius: 10px;
  height: 81vh;
  margin: 16vh 20px 0px 9vw;
}

</style>
