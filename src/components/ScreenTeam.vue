<template>
  <div id="team">
    <div id="team-navbar" class="w3-bar">
      <a :class="(currentPage==='top'?'active':'')+' w3-bar-item'" @click.prevent="currentPage='top'" >
        {{ $t("team.nav_top") }}
      </a>
      <a :class="(currentPage==='total_week'?'active':'')+' w3-bar-item'" @click.prevent="currentPage='total_week'" >
        {{ $t("team.nav_total_week") }}
      </a>
      <a :class="(currentPage==='total'?'active':'')+' w3-bar-item'" @click.prevent="currentPage='total'" >
        {{ $t("team.nav_total") }}
      </a>
    </div>
    <div id="team-content" >
      <div id="top" :class="{hidden: (currentPage != 'top')}">
        <ul>
          <li v-for="action in topActions" :key="action.id" >
            <img class="action-icon" :src="path+action.icon" />
            <div class="action-text">
              <span>{{ action.name }}</span><br/>
              <span class="action-count">{{ action.count }}</span>
              <div class="progress-bar w3-round-xlarge">
                <div class="progress w3-container w3-round-xlarge" :style="'width:'+action.progress+'%'"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="total_week" :class="{hidden: (currentPage != 'total_week')}" >
        <img id="total-week-board" src="../assets/img/total_week_board.png" />
      </div>
      <div id="total" :class="{hidden: (currentPage != 'total')}">
        <img id="total-board" src="../assets/img/total_board.png" />
      </div>
    </div>
  </div>
</template>

<script>
import store from '../services/store.js'
import Request from '../services/Request.js'

export default {
  name: 'ScreenFiche',
  data(){
    return {
      currentPage: "top",
      actions: [],
      topActions: [],
      path: process.env.VUE_APP_API_IMG_ROOT,
    }
  },
  async mounted() {
    this.actions = await Request.actions()

    let config = {params: {topNumber: 10}}
    this.topActions = await Request.actionsTop(config)

    for (var i=0; i<this.topActions.length; i++) {
      var action = this.actions.find(action => action.id === this.topActions[i].id)
      this.topActions[i].icon = action.icon
      this.topActions[i].name = action.name
      this.topActions[i].progress = this.topActions[i].count * process.env.VUE_APP_TEAM_PROGRESS_RATIO
    }
  }
}

</script>

<style lang="scss" scoped>

#team {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding-top: 30px;
  background-color: $team-bg-color;
  display: flex;
  flex-direction: column;
}

#team-navbar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
}

#team-navbar a {
  @include default-text();
  display: inline-block;
  width: 30%;
  text-align: center;
  text-transform: uppercase;
  line-height: 25px;
  background-color: $team-buttons-color;
  margin: 5px;
  border-radius: 30px;
  box-shadow: $title-drop-shadow;
  cursor: pointer;
}

#team-navbar a.active {
  font-weight: bold;
  background-color: $off-white;
}

#team-content div.hidden{
  display: none;
}

#team-content {
  height: 100%;
  width: 85%;
  overflow-y: scroll;
  margin: 20px auto;
}

/* Scrollbar */
#team-content::-webkit-scrollbar {
  width: 12px;
}
/* Handle */
#team-content::-webkit-scrollbar-thumb {
  background: $scrollbar-color;
  border-radius: 10px;
}
/* Handle on hover */
#team-content::-webkit-scrollbar-thumb:hover {
  background: $medium-grey;
}

#top ul {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}

#top ul li {
  @include default-text();

  margin: 8px 1px;
  background-color: $team-actions-card-color;
  box-shadow: $button-drop-shadow;
  color: $white;
  min-height: 55px;
  padding: 8px;

  display: flex;
  flex-direction: row;
  align-items: stretch;
}

#top .action-icon {
  flex-basis: $action-list-icon-size;
  width: $action-list-icon-size;
  height: $action-list-icon-size;
}

#top .action-text {
  width: 100%;
}

#top ul li span {
  display: inline-block;
  font-size: $medium-small-font-size;
  padding: 2px 5px 2px 15px;
}

#top .action-count {
  font-weight: bold;
  font-size: $medium-small-font-size;
}

#top .progress-bar {
  height: 8px;
  background-color: $dark-grey;
  width: 70%;
  display: inline-block;
  margin-left: 10px;
}
#top .progress-bar .progress {
  height: 8px;
  background-color: $progress-bar-color;
}

#total_week, #total {
  width: 100%;
}

#total_week #total-week-board, #total #total-board {
  display: block;
  margin: auto;
  width: 600px;
}

/* Medium screens */
@media (max-width:992px) and (min-width:601px) {
  #total_week #total-week-board, #total #total-board {
    width: 400px;
  }
}

/* Small screens */
@media (max-width:600px) {
  #total_week #total-week-board, #total #total-board {
    width: 300px;
  }
}

</style>
