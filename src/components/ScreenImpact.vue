<template>
  <div id="impact">
    <div id="impact-navbar" class="w3-bar">
      <a :class="(currentPage==='impact'?'active':'')+' w3-bar-item'" @click.prevent="currentPage='impact'" >
        {{ $t("impact.impact") }}
      </a>
      <a :class="(currentPage==='world'?'active':'')+' w3-bar-item'" @click.prevent="currentPage='world'" >
        {{ $t("impact.overshoot") }}
      </a>
      <a id="toggle-modal" class="w3-bar-item" @click.prevent="modal=true" >
        {{ $t("impact.modal") }}
      </a>
    </div>
    <ScreenWorld v-if="(currentPage === 'world')"/>
    <div v-else id="impact-container">
      <div id="impact-left-side">
        <h2>{{ $t("impact.header") }}</h2>
        <div id="impact-model">
          <div id="model-co2">
            <div class="icon"></div>
            <div class="model-card">
              <div class="progress-bar w3-round-xlarge">
                <div class="progress w3-container w3-round-xlarge" :style="'width:'+this.progress.co2+'%'"></div>
              </div>
              <span class="happy"></span>
              <span class="score"> {{ data.scoreGlobal.toLocaleString(locale) }} tCO<sub>2</sub> {{ $t("impact.co2") }} </span>
            </div>
          </div>
          <div id="model-pollution" :class="pollutionShow ? '' : 'inactive'">
            <div class="icon" @click.prevent="pollutionShow=!pollutionShow"></div>
            <div class="model-card w3-card">
              <div class="progress-bar w3-round-xlarge">
                <div class="progress w3-container w3-round-xlarge" :style="'width:'+this.progress.pollution+'%'"></div>
              </div>
              <span class="happy"></span>
              <span class="score"> {{ data.scorePollution.toLocaleString(locale) }} {{ $t("impact.pollution") }} </span>
            </div>
          </div>
          <div id="model-water" :class="waterShow ? '' : 'inactive'">
            <div class="icon" @click.prevent="waterShow=!waterShow"></div>
            <div class="model-card w3-card">
              <div class="progress-bar w3-round-xlarge">
                <div class="progress w3-container w3-round-xlarge" :style="'width:'+this.progress.water+'%'"></div>
              </div>
              <span class="happy"></span>
              <span class="score"> {{ data.scoreWater.toLocaleString(locale) }} {{ $t("impact.water") }} </span>
            </div>
          </div>
        </div>
        <div class="w3-card" id="impact-note">
          <div id="thumb-icon"></div>
          <div id="bravo-text">
            <h3>{{ $t("impact.bravo") }}</h3>
            <p v-html="data.bravoText"></p>
          </div>
        </div>
      </div>
      <div id="impact-right-side">
        <!-- animation goes here -->
      </div>
    </div>
    <div v-if="modal && (currentPage == 'world')" @click.self="modal=false" id="modal-backdrop-world">
      <div id="modal-world" class="modal">
        <div class="modal-body">
          <h3>{{ $t("impact.world.overshoot_day") }}</h3>
          <div v-html='$t("impact.world.modal")'></div>
        </div>
      </div>
    </div>
    <div v-else-if="modal && (currentPage == 'impact')" @click.self="modal=false" id="modal-backdrop-impact">
      <div id="modal-impact" @click="modal=false" class="modal">
        <div class="modal-body">
          <img src="../assets/img/impact_modal.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenWorld from './ScreenWorld.vue'
import Request from '../services/Request.js'
import store from '../services/store.js'

export default {
  name: 'ScreenImpact',
  data(){
    return {
      data: {},
      currentPage: "world",
      modal: false,
      pollutionShow: false,
      waterShow: false,
      locale: process.env.VUE_APP_LOCALE,
      progress: {co2:0, pollution:0, water:0},
      store
    }
  },
  components: {
    ScreenWorld
  },
  async mounted() {
    // get impact data
    this.data = this.store.get('impactMetadata')
    this.progress.co2 = (this.data.scoreGlobal/this.data.maxScoreGlobal)*100
    this.progress.pollution = (this.data.scorePollution/this.data.maxScorePollution)*100
    this.progress.water = (this.data.scoreWater/this.data.maxScoreWater)*100

    console.log(this.data)
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: $impact-font-face;
  src: url($impact-font-face-url) format('truetype');
}

#impact {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding-top: 30px;
  background: linear-gradient(0deg, #719fd2 0%, #e3f4f6 100%);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

#impact-navbar{
  width: 140px;
  z-index: 10;
  align-self: flex-end;
  position: absolute;
}

#impact-navbar a {
  display: block;
  width: 130px;
  margin: 5px;
  height: 30px;
  background-color: #f6eac0;
  border-radius: 5px;
  box-shadow: $card-drop-shadow;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}

#impact-navbar a#toggle-modal {
  color: $white;
  background-color: #333367;
}

#impact-navbar a.active {
  background-color: $medium-grey;
  cursor: default;
  opacity: 0.5;
}

#impact-container {
  height: 100%;
}

#impact-left-side, #impact-right-side {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#impact-left-side {
  float: left;
  width: 50%;
}
#impact-right-side {
  float: right;
  width: 50%;
}

#impact-left-side h2 {
  font-family: $impact-font-face;
  font-weight: bold;
  margin: 0px 0px 0px 30px;
  font-size: $large-font-size;
  color: #444;
}

#impact-model {
  flex: none;
  border-left: 2px solid #444;
  margin-left: 50px;
  margin-top: 15px;
}

#model-co2, #model-pollution, #model-water {
  height: 50px;
  width: 100%;
  margin-bottom: 20px;
  transform: translateX(-23px);
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

#model-co2 .icon, #model-pollution .icon, #model-water .icon{
  display: block;
  background: white;
  border-radius: 30px;
  height: 45px;
  width: 45px;
  background-position: center;
  background-size: 28px 28px;
  background-repeat: no-repeat;
}

#model-co2 .icon {
  background-image: url("../assets/img/ico_earth.png");
  border: 2px solid #2dbcaa;
}

#model-pollution .icon {
  background-color: white;
  background-image: url("../assets/img/ico_pollution.png");
  border: 2px solid #e7d9b1;
}

#model-water .icon {
  background-color: white;
  background-image: url("../assets/img/ico_water.png");
  border: 2px solid #1e79d2;
}

#model-pollution.inactive .icon, #model-water.inactive .icon {
  background-color: #d8d8d8;
  border: 2px solid #d8d8d8;
}

#model-pollution.inactive .model-card, #model-water.inactive .model-card {
  display: none;
}

#model-pollution.inactive .icon:hover, #model-water.inactive .icon:hover {
  transform: scale(1.1);
}

#model-co2 {
  margin-top: 40px;
}
#model-water {
  margin-bottom: 40px;
}

.progress-bar {
  height: 8px;
  background-color: #606060;
  width: auto;
  display: block;
  margin: 10px 20px 0px 20px;
  border-radius: 0px;
}
.progress-bar .progress {
  height: 8px;
  border-radius: 0px;
  padding: 0px;
}

#model-co2 .progress {
  background-color: white;
}
#model-pollution .progress {
  background-color: #e7d9b1;
}
#model-water .progress {
  background-color: #1e79d2;
}

.model-card {
  background: #a4cade;
  border-radius: 15px 30px 30px 15px;
  flex: 1;
  margin: 0px 50px 0px 25px;
  line-height: 40px;
  vertical-align: center;
  padding: 0px 5px;
  box-shadow: 2px 1px 0px #999;
}

.model-card::before{
  content: '';
  width: 0;
  height: 0;
  margin-top: 2px;
  border-top: 23px solid transparent;
  border-right: 25px solid #a4cade;
  border-bottom: 23px solid transparent;
  float: left;
  position: absolute;
  z-index: -1;
  transform: translateX(-25px);
}

.model-card .score {
  display: inline-block;
  color: #606060;
  font-size: 18px;
  line-height: 30px;
  vertical-align: middle;
  margin-bottom: 10px;
  margin-left: 5px;
}

.happy {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-image: url("../assets/img/happy.png");
  background-size: 20px 20px;
  background-position: center;
  background-repeat: no-repeat;
  float: left;
  margin-left: 20px;
  padding-top: 5px;
}

#impact-note {
  width: 90%;
  border-radius: 8px;
  background: #49a8be;
  padding: 20px;
  margin: 30px;
  flex: 1;
  display: flex;
}

#thumb-icon {
  width: 100px;
  background-image: url("../assets/img/ico_thumb.png");
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: auto 60px;
  border-right: 2px solid #3a8698;
  margin-right: 15px;
  flex: none;
}

#bravo-text {
  color: white;
  font-family: $impact-font-face;
  margin-top: 0px;
  display: block;
  width: auto;
  align-self: center;
}

#bravo-text h3 {
  margin-top: 0px;
  font-size: 30px;
}

#bravo-text p {
  font-size: 18px;
  text-align: justify;
}

// Modal
#modal-backdrop-world {
  @include modal-backdrop();
  z-index: 10;
}

#modal-backdrop-impact {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

#modal-world {
  background: #80d2e5;
  border-radius: 20px;
  width: 40%;
  color: $dark-grey;
  font-family: $impact-font-face;
  font-weight: bold;
}

#modal-impact {
  height: auto;
  width: auto;
  max-height: 100%;
  max-width: 100%;
  margin: auto;
}

#modal-impact img {
  max-width: 100%;
}

#modal-world .modal-body {
  font-family: $impact-font-face;
  position: relative;
  padding: 60px 60px 80px 30px;
}

.modal-body h3 {
  font-family: $impact-font-face;
  font-weight: bolder;
  font-size: $large-font-size;
  text-decoration: underline;
}

.modal-body div {
  padding-top: 20px;
  font-size: $medium-font-size;
  text-align: justify;
}

</style>
