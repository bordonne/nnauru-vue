<template>
  <div id="impact">
    <div id="impact-navbar" class="w3-bar">
      <a :class="(currentPage==='impact'?'active':'')+' w3-bar-item'" @click.prevent="currentPage='impact'" >
        {{ $t("impact.impact") }}
      </a>
      <a :class="(currentPage==='world'?'active':'')+' w3-bar-item'" @click.prevent="currentPage='world'" >
        {{ $t("impact.overshoot") }}
      </a>
      <a id="toggle-modal" class="w3-bar-item">
        {{ $t("impact.modal") }}
      </a>
    </div>
    <ScreenWorld v-if="(currentPage === 'world')"/>
    <div v-else id="impact-container">
      {{ $t("impact.impact") }}
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
      data: "",
      currentPage: "world"
    }
  },
  components: {
    ScreenWorld
  }
}
</script>

<style lang="scss" scoped>
#impact {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding-top: 30px;
  background: linear-gradient(0deg, #719fd2 0%, #e3f4f6 100%);
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
}

#impact-navbar a#toggle-modal {
  color: $white;
  background-color: #333367;
}

#impact-navbar a.active {
  background-color: $medium-grey;
  opacity: 0.5;
}


</style>
