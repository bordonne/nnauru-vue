<template>
  <div id="mainscreen">
  <header class="w3-display-container">
    <div class="app-title">
      <h1 class="w3-display-topleft">{{ $t("app_title") }}</h1>
    </div>
    <div class="w3-display-topmiddle" id="week-select">
      <div id="date-icon"><img src="../assets/img/calendar_grey.svg" /></div>
      <div v-for="week in weeks" :key="week.week_id" :style="'display:'+week.display">
        {{ formatDate(week.startDate) }} - {{ formatDate(week.endDate) }}
      </div>
      <button class="w3-button w3-display-topleft w3-round" @click.prevent="showDivs(-1)">&#10094;</button>
      <button class="w3-button w3-display-topright w3-round" @click.prevent="showDivs(+1)">&#10095;</button>
    </div>
    <button class="w3-display-topright w3-button w3-ripple w3-circle w3-red w3-display-container" @click.prevent="logout">
      <img class="w3-display-middle" src="../assets/img/ico_cross.svg" />
    </button>
  </header>
  <!-- Nav -->
  <nav class="w3-sidebar w3-top">
    <a @click.prevent="currentScreen = Screen.Fiche" style="margin-bottom:30px" :class="{active: (currentScreen === Screen.Fiche)}">
      <img src="../assets/img/ico_fiche.svg"/>
      <span>{{ $t("nav.fiche") }}</span>
    </a>
    <a @click.prevent="currentScreen = Screen.Me" :class="{active: (currentScreen === Screen.Me)}">
      <div id="team-banner" :style="'border-top: 8px solid '+teamColor+';'"></div>
      <img src="../assets/img/ico_me.svg" style="transform:translateY(-8px)"/>
      <span style="transform:translateY(-8px)">{{ $t("nav.me") }} {{ username }}</span>
    </a>
    <a @click.prevent="currentScreen = Screen.Team" :class="{active: (currentScreen === Screen.Team)}">
      <img src="../assets/img/ico_class.svg"/>
      <span>{{ $t("nav.team") }}</span>
    </a>
    <a @click.prevent="currentScreen = Screen.Impact" :class="{active: (currentScreen === Screen.Impact)}">
      <img src="../assets/img/ico_earth.svg"/>
      <span>{{ $t("nav.impact") }}</span>
    </a>
  </nav>

  <div class="content-wrapper">
    <!-- Header -->
    <div id="header-img" class="">
    </div>
    <!-- Page Content -->
    <div id="page-content" class="">
      <ScreenFiche :key="currentWeek" v-if="currentScreen === Screen.Fiche"/>
      <ScreenMe :key="currentWeek" v-else-if="currentScreen === Screen.Me" />
      <ScreenTeam :key="currentWeek" v-else-if="currentScreen === Screen.Team" />
      <ScreenImpact :key="currentWeek" v-else-if="currentScreen === Screen.Impact" />
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
      username: store.get('username'),
      teamColor: store.get('team').color,
      currentScreen: Screen.Fiche,
      slideIndex: 0,
      currentWeek: {},
      weeks: [],
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
    },
    showDivs(n) {
      if (this.weeks.length > 0) {
        var i=0
        this.slideIndex += n
        if (this.slideIndex >= this.weeks.length) {this.slideIndex = 0}
        if (this.slideIndex < 0) {this.slideIndex = this.weeks.length-1}
        for (i = 0; i < this.weeks.length; i++) {
          this.weeks[i].display = "none"
          this.formatDate(this.weeks[i].startDate)
        }
        this.weeks[this.slideIndex].display = "block"

        // Change currentWeek
        this.store.set('week', this.weeks[this.slideIndex])
        
        this.currentWeek = this.weeks[this.slideIndex]
      }
   },
   formatDate(dateStr) {
     var dateArr = dateStr.split('-')
     return dateArr[2]+'/'+dateArr[1]
   }
  },
  components: {
    ScreenFiche,
    ScreenMe,
    ScreenTeam,
    ScreenImpact
  },
  mounted() {

    // Get weeks
    this.weeks = this.store.get('weeks')
    this.currentWeek = this.store.get('week')
    this.slideIndex = this.currentWeek.week_id

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

#week-select {
  width: 180px;
  height: 32px;
  color: #666;
  border-radius: 5px;
  margin-top: 85px;
  margin-left: 22px;
  background: $white;
  border-radius: 5px;
  box-shadow: $button-drop-shadow;
  display: flex;
  direction: row;
  justify-content: center;
  align-items: center;
}

#date-icon img{
  height: 20px;
  padding: 3px;
}

#week-select button {
  width: 20px;
  height: 20px;
  font-size: 10px;
  border-radius: 20px;
  margin: 5px;
  padding: 0px;
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
@media (max-width:1280px) and (min-width:897px), (max-height:800px) and (min-height:415px) {
  #header-img {
      height: 100px;
  }
  #page-content {
      height: calc(100vh - 15px - 100px);
  }
  nav {
    margin-top: 90px;
  }
}

/* Small screens */
@media (max-width:896px) and (max-height:414px) {
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
    margin-top: 90px;
  }
  nav a {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  nav img {
    display: none;
  }
}
</style>
