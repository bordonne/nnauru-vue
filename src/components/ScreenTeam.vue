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
      <div id="total-week" :class="{hidden: (currentPage != 'total_week')}" >
        <div id="bar-chart">
          <div v-for="weekTeam in weekTeams" :key="weekTeam.id" class="bar"
            :style="{ backgroundColor: weekTeam.color, height: weekTeam.count + '%' }">
          </div>
        </div>
        <div id="bar-chart-caption-container">
          <div v-for="weekTeam in weekTeams" :key="weekTeam.id" class="chart-caption">
            <span class="caption-color" :style="'color:'+weekTeam.color"></span>
            <span class="caption">{{ weekTeam.count }} {{ $t("team.points") }}</span>
          </div>
        </div>
      </div>
      <div id="total" :class="{hidden: (currentPage != 'total')}">
        <div id="pie-chart" :style="'background:conic-gradient('+conicGradient+');'"></div>
        <div id="pie-chart-caption-container">
          <div v-for="team in teams" :key="team.id" class="chart-caption">
            <span class="caption-color" :style="'color:'+team.color"></span>
            <span class="caption">{{ team.count }} {{ $t("team.points") }}</span>
          </div>
        </div>
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
      weekTeams: [],
      teams: [],
      conicGradient: '',
      store
    }
  },
  async mounted() {

    this.actions = this.store.get('actions')

    let configTop = {params: {topNumber: 10}}
    this.topActions = await Request.actionsTop(configTop)

    for (var i=0; i<this.topActions.length; i++) {
      var action = this.actions.find(action => action.id === this.topActions[i].id)
      this.topActions[i].icon = action.icon
      this.topActions[i].name = action.name
      this.topActions[i].progress = this.topActions[i].count * process.env.VUE_APP_TEAM_PROGRESS_RATIO
    }

    // Get teams and totals for total_week and total
    let teamsData = await Request.teams()

    let configTeams = {
      params: this.store.get('week')
    }
    // Score for this week
    this.weekTeams = await Request.teamsTotal(configTeams)
    var teamData = {}
    for (i=0; i<this.weekTeams.length; i++) {
      teamData = teamsData.find(teamData => teamData.id === this.weekTeams[i].id)
      this.weekTeams[i].color = teamData.color
    }

    // Total scores
    this.teams = await Request.teamsTotal()

    var offset = 0 // for the pie graph
    for (i=0; i<this.teams.length; i++) {
      teamData = teamsData.find(teamData => teamData.id === this.teams[i].id)
      offset += this.teams[i].count
      this.teams[i].color = teamData.color
      this.teams[i].offset = offset
    }

    let conicGradientArray = []
    for (i=0; i<this.teams.length; i++) {
      conicGradientArray.push(this.teams[i].color+' 0')
      conicGradientArray.push(this.teams[i].color+' '+(100*this.teams[i].offset/offset)+'%')
    }
    this.conicGradient = conicGradientArray.join(',')
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
  font-family: $default-font-face;
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

/* TOP */
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

/* TOTAL WEEK */
#total-week {
  background-image: url("../assets/img/total_week_board.png");
  background-position: top center;
  background-size: auto 100%;
  background-repeat: no-repeat;

  width: 100%;
  height: 100%;

  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
}

#bar-chart {
  width: 230px;
  height: 230px;
  margin: auto;
  display: flex;
  margin: auto;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
}

#bar-chart .bar {
  width: 50px;
  border: 1px solid white;
}

/* TOTAL */
#total {
  background-image: url("../assets/img/total_board.png");
  background-position: top center;
  background-size: auto 100%;
  background-repeat: no-repeat;

  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
}
/* Pie chart */
#pie-chart {
  border: 1px solid white;
  width: 230px;
  height: 230px;
  margin: auto;
  border-radius: 100%;
}

#pie-chart-caption-container, #bar-chart-caption-container {
  text-align: center;
  margin: auto;
  padding-top: 5px;
}

.chart-caption {
  display: inline;
  padding: 1px;
  wrap: nowrap;
}
.chart-caption .caption-color:before {
  display: inline-block;
  border: 1px solid white;
  content: "";
  width: 10px;
  height: 10px;
  margin-left: 5px;
  border-radius: 2px;
  background: currentColor;
}

.caption-color, .caption {
  padding: 1px;
}

/* Medium screens */
@media (max-width:992px) and (min-width:601px) {
  #pie-chart, #bar-chart {
    width: 180px;
    height: 180px;
  }
}

/* Small screens */
@media (max-width:600px) {
  #total {
    background-size: 100% auto;
    padding: 50px;
  }
  #pie-chart, #bar-chart {
    width: 150px;
    height: 150px;
  }
}

</style>
