<template>
  <div id="world">
      <h2>{{ $t("impact.world.header") }}</h2>
      <div id="planets">
        <div id="planet-nb">
          <span>{{ planetCountStr }}</span> <span>{{ $t("impact.world.planets") }}</span>
        </div>
        <div id="planet-images">
          <div v-for="planet in planets" :key="planet.id" class="planet-img"
            :style="'--planetheight:'+planet.size">
            <transition name="planet">
              <img v-if="planet.show" src="../assets/img/world.png" />
            </transition>
          </div>
        </div>
      </div>
      <div id="calendars">
        <transition name="calendars">
          <div v-if="showCalendars" id="calendars-wrapper">
            <div class="w3-card calendar" id="calendar-with">
              <div class="calendar-icon w3-hide-small"></div>
              <div class="calendar-text">
                <span>{{ $t("impact.world.overshoot_day") }}</span>
                <span style="color:limegreen">{{ $t("impact.world.with") }}</span>
                <span class="overshoot-date">{{ data.jourdepassementavec }}</span>
              </div>
            </div>
            <div id="calendar-separator"></div>
            <div  v-if="showCalendars" class="w3-card calendar" id="calendar-without">
              <div class="calendar-icon w3-hide-small"></div>
              <div class="calendar-text">
                <span>{{ $t("impact.world.overshoot_day") }}</span>
                <span style="color:darkred">{{ $t("impact.world.without") }}</span>
                <span class="overshoot-date">{{ data.jourdepassementsans }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import Request from '../services/Request.js'
import store from '../services/store.js'

function formatCount(count) {
  count = Math.round(count) / 10

  if (Math.round(count) === count) { //round number
    count += 0.1
    let res = count.toLocaleString(process.env.VUE_APP_LOCALE)
    return res.slice(0, -1)+"0"
  }

  return count.toLocaleString(process.env.VUE_APP_LOCALE)
}

export default {
  name: 'ScreenWorld',
  data(){
    return {
      data: {},
      planetCountStr: "0",
      planets: [],
      showCalendars: false,
      store
    }
  },
  async mounted() {
    // Get impact data
    this.data = this.store.get('impact')

    let nbPlanets = this.data.depassementnombreplanetes
    let nbPlanetsFloor = Math.floor(nbPlanets)
    let nbPlanetsRemainder = nbPlanets - nbPlanetsFloor

    for (var i=0; i<nbPlanetsFloor; i++) {
      this.planets.push({
        show: false,
        size: 1
      })
    }
    this.planets.push({
      show: false,
      size: nbPlanetsRemainder
    })

    // Planet image animation
    for (let j=0; j<this.planets.length; j++) {
      setTimeout(() => { this.planets[j].show=true }, j*1000);
    }

    // Planet counter animation
    let planetCount = 0
    var planetInterval = setInterval(() => {
      if (planetCount >= (nbPlanets*10)) {
        this.showCalendars = true
        clearInterval(planetInterval)
      } else {
        planetCount += 1
        this.planetCountStr = formatCount(planetCount)
      }
    }, 100)

  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: $impact-font-face;
  src: url($impact-font-face-url) format('truetype');
}

#world {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h2 {
  font-family: $impact-font-face;
  font-weight: bold;
  font-size: 45px;
  margin-left: 40px;
}

#planets {
  width: 100%;
  height: 200px;
  display: flex;
}

#planet-nb {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#planet-nb span {
  font-family: $impact-font-face;
  font-size: 80px;
  font-weight: 300;
  margin-right: 40px;
}

#planet-nb span:first-child{
  font-family: $impact-font-face;
  font-size: 100px;
  margin-right: 25px;
  transform: translateY(-10px);
}

#planet-images {
  width: 50%;
  display: flex;
  align-items: center;
}

// Planet enter transition
.planet-enter-active {
  transition: all 1s ease;
}
.planet-enter-from {
  transform: scale(0.1);
}

.planet-img img {
  height: calc(var(--planetheight)*200px);
  width: calc(var(--planetheight)*200px);
}

#calendars {
  height: 230px;
  width: 100%;
  overflow: hidden;
}

#calendars-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

// Calendars enter transition
.calendars-enter-active {
  transition: all 1s ease;
}
.calendars-enter-from {
  transform: translateX(100%);
}

#calendar-separator {
  border-left: 1.5px solid #3a8698;
  margin: 0 40px 20px 0;
}

.calendar {
  border-radius: 5px;
  background: #49a8be;
  padding: 20px;
  width: 38%;
  text-align: center;
  margin-bottom: 20px;
}

.calendar-icon {
  width: 40%;
  height: 100%;
  float: left;
  background-image: url("../assets/img/calendar.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 50%;
  border-right: 1px solid #3a8698;
}

.calendar-text {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.calendar-text span {
  display: inline-block;
  color: white;
  padding-left: 10px;
  font-size: 25px;
}

.calendar-text .overshoot-date{
  font-size: 70px;
  font-weight: bold;
  margin-top: 10%;
}

/* Medium plus screens */
@media (max-width:1441px) and (min-width:993px) {
  h2 {
    font-size: 30px;
    margin-left: 40px;
  }
  #planet-nb span {
    font-size: 50px;
    margin-right: 40px;
  }
  #planet-nb span:first-child{
    font-size: 70px;
    transform: translateY(-5px);
  }
  .calendar-text .overshoot-date{
    font-size: 50px;
    margin-top: 10%;
  }
  .calendar-text span {
    font-size: 23px;
  }
}

/* Medium screens */
@media (max-width:992px) and (min-width:601px) {
  h2 {
    font-size: 25px;
    margin-left: 30px;
  }
  #planet-nb span {
    font-size: 40px;
    margin-right: 30px;
  }
  #planet-nb span:first-child{
    font-size: 60px;
    transform: translateY(-3px);
  }
  .calendar-text .overshoot-date{
    font-size: 40px;
    margin-top: 10%;
  }
  .calendar-text span {
    font-size: 18px;
  }
}

/* Small screens */
@media (max-width:600px) {
  h2 {
    font-size: 20px;
    margin-left: 20px;
  }
  #planet-nb span {
    font-size: 20px;
    margin-right: 20px;
  }
  #planet-nb span:first-child{
    font-size: 30px;
  }
  .calendar-text .overshoot-date{
    font-size: 30px;
    margin-top: 10%;
  }
  .calendar-text span {
    font-size: 15px;
  }
}

</style>
