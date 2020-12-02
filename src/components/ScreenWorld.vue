<template>
  <div id="world">
      <h2>{{ $t("impact.world.header") }}</h2>
      <div id="planets">
        <span id="planets-nb">{{ planetCount.toLocaleString(locale) }}</span> <span>{{ $t("impact.world.planets") }}</span>
        <div v-for="planet in planets" :key="planet.id" class="planet-img"
          :style="'--planetheight:'+planet.size">
          <transition name="planet">
            <img v-if="planet.show" src="../assets/img/world.png" />
          </transition>
        </div>
      </div>
      <div id="calendars">
        <div class="w3-card calendar" id="calendar-with">
          <div class="calendar-icon"></div>
          <span>{{ $t("impact.world.overshoot_day") }}</span><br/>
          <span>{{ $t("impact.world.with") }}</span><br/>
          <span>{{ data.jourDepassementAvec }}</span>
        </div>
        <div class="w3-card calendar" id="calendar-without">
          <div class="calendar-icon"></div>
          <span>{{ $t("impact.world.overshoot_day") }}</span><br/>
          <span>{{ $t("impact.world.without") }}</span><br/>
          <span>{{ data.jourDepassementSans }}</span>
        </div>
      </div>
  </div>
</template>

<script>
import Request from '../services/Request.js'

export default {
  name: 'ScreenWorld',
  data(){
    return {
      data: {},
      planetCount: 0,
      planets: [],
      locale: process.env.VUE_APP_LOCALE
    }
  },
  async mounted() {
    // Fetch impact data
    let categories = await Request.categories()
    let dataJSON = categories.pop()

    this.data = JSON.parse(dataJSON.metadata)

    let nbPlanets = this.data.depassementNombrePlanetes
    let nbPlanetsFloor = Math.floor(nbPlanets)
    let nbPlanetsRemainder = nbPlanets - nbPlanetsFloor

    for (var i=0; i<nbPlanetsFloor; i++) {
      this.planets.push({
        show: false,
        size: "100%"
      })
    }
    this.planets.push({
      show: false,
      size: nbPlanetsRemainder*100+"%"
    })

    for (let j=0; j<this.planets.length; j++) {
      setTimeout(() => { this.planets[j].show=true }, j*1000);
    }

    // Planet counter animation
    var planetInterval = setInterval(() => {
      if (this.planetCount >= nbPlanets) {
        clearInterval(planetInterval)
      } else {
          this.planetCount += 0.1
      }
    }, 80)

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
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

h2 {
  font-family: $impact-font-face;
  font-weight: bold;
  align-self: flex-start;
  font-size: $large-font-size;

}

#planets {
  height: 200px;
  line-height: 200px;
  vertical-align: middle;
}

#planets span{
  font-family: $impact-font-face;
  font-size: 50px;
  font-weight: 300;
  padding: 10px;
  display: inline-block;
  height: 200px;
}

#planets span#planets-nb{
  font-family: $impact-font-face;
  font-size: 80px;
}

.planet-img {
  display: inline;
  height: 200px;
  min-width: 100px;
}

.planet-enter-active {
  transition-property: all;
  transition-duration: 1s;
  transition-timing-function: ease;
  height: var(--planetheight);
}

.planet-enter-from {
  height: 0px;
  width: 0px;
}

.planet-img img {
  max-height: var(--planetheight);
  width: auto;
}

#calendars {
  height: 150px;
}

#calendar-with, #calendar-without {
  width: 40%;
  height: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  background: #49a8be;
  padding: 20px;
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

#calendars {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.calendar {
  text-align: center;
}

.calendar span {
  padding-left: 10px;
  font-size: $medium-font-size;
}

.calendar span:nth-child(6) {
  font-size: $xlarge-font-size;
  font-weight: bold;
}

.calendar span:nth-child(2), .calendar span:nth-child(6) {
  color:white;
}

#calendar-with span:nth-child(4) {
  color: limegreen;
}

#calendar-without span:nth-child(4) {
  color: darkred;
}

</style>
