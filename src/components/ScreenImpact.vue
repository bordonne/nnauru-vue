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
          <div id="model-icons"></div>
          <div id="model-co2">
            <div class="icon"></div>
            <div class="model-card w3-card">{{ data.scoreGlobal }} {{ $t("impact.co2") }}</div>
          </div>
          <div id="model-pollution">
            <div class="icon"></div>
            <div class="model-card w3-card">{{ data.scorePollution }} {{ $t("impact.pollution") }}</div>
          </div>
          <div id="model-water">
            <div class="icon"></div>
            <div class="model-card w3-card">{{ data.scoreWater }} {{ $t("impact.water") }}</div>
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
    <div v-if="modal" @click.self="modal=false" class="modal-backdrop">
      <div v-if="currentPage == 'world'" id="modal-world" class="modal">
        <div class="modal-body">
          <h3>{{ $t("impact.world.overshoot_day") }}</h3>
          <div v-html='$t("impact.world.modal")'></div>
        </div>
      </div>
      <div v-else id="modal-impact" @click="modal=false" class="modal">
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

export default {
  name: 'ScreenImpact',
  data(){
    return {
      data: {},
      currentPage: "world",
      modal: false
    }
  },
  components: {
    ScreenWorld
  },
  async mounted() {
    // Fetch impact data
    let categories = await Request.categories()
    let dataJSON = categories.pop()

    this.data = JSON.parse(dataJSON.metadata)
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
}

#impact-navbar{
  float: right;
  width: 10%;
  z-index: 10;
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
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#impact-left-side {
  float: left;
}
#impact-right-side {
  float: right;
}

#impact-left-side h2 {
  font-family: $impact-font-face;
  font-weight: bold;
  margin: 0px 0px 0px 30px;
  font-size: $large-font-size;
}

#impact-model {
  flex: 1;
}

#impact-model #model-icons {
  float: left;
  position: absolute;
  width: 1px;
  height: 200px;
  border: 1px solid black;
  margin: 30px 40px;
}

#model-co2, #model-pollution, #model-water {
  height: 40px;
  width: 100%;
  margin: 15px 0px 15px 40px;
  transform: translateX(-19px);
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

#model-co2 .icon, #model-pollution .icon, #model-water .icon{
  display: block;
  background: white;
  border-radius: 30px;
  height: 40px;
  width: 40px;
  border: 2px solid black;
  background-position: center;
  background-size: 25px 25px;
  background-repeat: no-repeat;
}

#model-co2 .icon {
  background-image: url("../assets/img/ico_earth.png");
  border: 1.5px solid #2dbcaa;
}

#model-pollution .icon {
  background-image: url("../assets/img/ico_trash.svg");
  border: 1.5px solid #dedbc2;
}

#model-water .icon {
  background-image: url("../assets/img/ico_water.png");
  border: 1.5px solid #579cdd;
}

#model-co2 {
  margin-top: 50px;
}

.model-card {
  background: #a4cade;
  border-radius: 30px;
  flex: 1;
  margin: 0px 50px 0px 20px;
  line-height: 40px;
  vertical-align: center;
  padding: 0px 5px;
}

#impact-note {
  width: 90%;
  margin-bottom: 20px;
  border-radius: 8px;
  background: #49a8be;
  padding: 20px;
  margin: 20px;
  flex: 1;
}

#thumb-icon {
  width: 20%;
  height: 100%;
  float: left;
  background-image: url("../assets/img/ico_thumb.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 30%;
  border-right: 1px solid #3a8698;
  margin-right: 15px;
}

#bravo-text {
  color: white;
  font-family: $impact-font-face;
  margin-top: 0px;
  display: block;
  float: right;
  width: 75%;
}

#bravo-text h3 {
  margin-top: 0px;
}

#bravo-text p {
  font-size: 15px;
  text-align: justify;
}

// Modal
.modal-backdrop {
  @include modal-backdrop();
  z-index: 10;
}

#modal-world {
  background: #80d2e5;
  border-radius: 20px;
  width: 500px;
  color: $dark-grey;
  font-family: $impact-font-face;
}

#modal-impact {
  height: 100%;
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
