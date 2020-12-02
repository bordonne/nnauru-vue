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
    <a @click.prevent="currentScreen = Screen.Fiche" style="margin-bottom:40px" :class="{active: (currentScreen === Screen.Fiche)}">
      <img class="w3-hide-small" src="../assets/img/ico_fiche.svg"/>
      <span>{{ $t("nav.fiche") }}</span>
    </a>
    <a @click.prevent="currentScreen = Screen.Me" :class="{active: (currentScreen === Screen.Me)}">
      <div id="team-banner" :style="'border-top: 8px solid '+team+';'"></div>
      <img class="w3-hide-small" src="../assets/img/ico_me.svg" style="transform:translateY(-8px)"/>
      <span style="transform:translateY(-8px)">{{ $t("nav.me") }} {{ username }}</span>
    </a>
    <a @click.prevent="currentScreen = Screen.Team" :class="{active: (currentScreen === Screen.Team)}">
      <img class="w3-hide-small" src="../assets/img/ico_class.svg"/>
      <span>{{ $t("nav.team") }}</span>
    </a>
    <a @click.prevent="currentScreen = Screen.Impact" :class="{active: (currentScreen === Screen.Impact)}">
      <img class="w3-hide-small" src="../assets/img/ico_earth.svg"/>
      <span>{{ $t("nav.impact") }}</span>
    </a>
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
import Request from '../services/Request.js'
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
      team: "#fff",
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
  },
  async mounted() {
    // Get the user's team color
    let teams = await Request.teams()

    for (var i=0; i<teams.length; i++){
      let teamChildren = await Request.teamChildren(teams[i].id)
      let names = teamChildren.map((value) => value.pseudo)

      if (names.includes(this.username)) {
        this.team = teams[i].color
        break
      }

    }
  }
}
</script>

<style lang="scss" scoped>

@font-face {
  font-family: $title-font-face;
  src: url($title-font-face-url) format('truetype');
}

@font-face {
  font-family: $default-font-face;
  src: url($default-font-face-url) format('opentype');
  font-weight: normal;
}

#mainscreen {
  @include full-window();
  background-color: $mainscreen-bg-color;
}

h1 {
  font-family: $title-font-face;
  font-size: $mainscreen-title-font-size;
  margin-left: 20px;
}

header {
  z-index: 10;
}

header button {
  height: 40px;
  width: 40px;
  margin: 20px;
  box-shadow: $button-drop-shadow;
}

header button img {
  height: 17px;
  width: 17px;
}

nav {
  float: left;
  width: 120px;
  margin-top: 140px;
  margin-left: 5px;
  background: none;
}

nav a {
  display: block;
  margin: 15px auto;
  height: 80px;
  width: 80px;
  text-transform: uppercase;
  color: $mainscreen-button-text-color;
  font-size: 11px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: $mainscreen-button;
  box-shadow: $button-drop-shadow;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}

nav a:hover {
  transform: scale(1.1)
}

nav a.active {
  transform: scale(1.1);
  background-color: $mainscreen-button-active;
}

nav a img {
  max-width: 70%;
  max-height: 70%;
  padding-top: 5px;
}

nav a span {
  display: block;
  padding: 5px 0px;
}

/* common */
#team-banner {
  width: 120px;
  border-bottom: 2px solid $medium-grey;
  transform: translate(-10px, -10px) rotate(-45deg);
}

.content-wrapper {
  margin-left: 120px;
  height: 100%;
}

#header-img {
  background-image: url($mainscreen-header-img);
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 84% auto;
  height: 150px;
  margin-right: 5px;
  transform: scale(1.2);
  transform-origin: right top;
}

#page-content {
  box-shadow: $card-drop-shadow;
  border-radius: 10px;
  margin: 0px 15px;
  height: calc(100vh - 15px - 150px);

}

/* Medium screens */
@media (max-width:992px) and (min-width:601px) {
  #header-img {
      height: 100px;
  }
  #page-content {
      height: calc(100vh - 15px - 100px);
  }
}

/* Small screens */
@media (max-width:600px) {
  h1 {
    font-size: $xlarge-font-size;
  }
  #header-img {
      height: 100px;
  }
  #page-content {
      height: calc(100vh - 15px - 100px);
  }
  .content-wrapper {
    margin-left: 60px;
  }
  nav {
    width: 60px;
  }
  nav a {
    height: 50px;
    width: 50px;
  }
}
</style>
