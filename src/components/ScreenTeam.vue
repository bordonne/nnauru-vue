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
        <img src="../assets/img/boys_finish_line_front.png"/>
        <div id="total-week-board">
          <div id="bar-chart-wrapper">
            <TeamBarChart v-if="teamsChartData" :chartdata="teamsChartData"/>
          </div>
        </div>
      </div>
      <div id="total" :class="{hidden: (currentPage != 'total')}">
        <div id="pie-chart" :style="'background:conic-gradient('+conicGradient+');'"></div>
        <div id="pie-chart-caption-container">
          <div v-for="team in teamPoints" :key="team.id" class="chart-caption">
            <span class="caption-color" :style="'color:'+team.color"></span>
            <span class="caption">{{ team.count_total }} {{ $t("team.points") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../services/store.js'
import Request from '../services/Request.js'
import TeamBarChart from './TeamBarChart'

export default {
  name: 'ScreenTeam',
  data(){
    return {
      currentPage: "top",
      actions: [],
      topActions: [],
      path: process.env.VUE_APP_API_IMG_ROOT,
      teamsChartData: null,
      teamPoints: [],
      conicGradient: '',
      store
    }
  },
  components: {
    TeamBarChart
  },
  async mounted() {
    this.actions = this.store.get('actions')
    let weeks = await Request.weeks()
    let children = await Request.children()

    let max = weeks.length * children.length

    let configTop = {params: {topNumber: 10, week_id: this.store.get('activeWeek').week_id}}
    this.topActions = await Request.actionsTop(configTop)

    // We should change the api to return the action name and icon directly...
    for (var i=0; i<this.topActions.length; i++) {
      var action = this.actions.find(action => action.id === this.topActions[i].id)
      this.topActions[i].icon = action.icon
      this.topActions[i].name = action.name
      this.topActions[i].progress = this.topActions[i].count * max/100

      if (this.topActions[i].progress >= 100) {
        this.topActions[i].progress = this.topActions[i].progress/20
      }
    }

    // Get teams and totals for total_week and total
    let teamsData = await Request.teams()

    let configTeams = {
      params: { week_id: this.store.get('activeWeek').week_id }
    }
    // Score for this week
    this.teamPoints = await Request.teamsTotal(configTeams)

    var teamData = {}
    var dataSets = []

    var offset = 0 // for the pie graph
    for (i=0; i<this.teamPoints.length; i++) {
      teamData = teamsData.find(teamData => teamData.id === this.teamPoints[i].id)
      this.teamPoints[i].color = teamData.color
      offset += this.teamPoints[i].count_total
      this.teamPoints[i].offset = offset

      var dataSet = {
        label: [this.teamPoints[i].count_week+" "+this.$t('team.points')],
        data: [this.teamPoints[i].count_week],
        backgroundColor: this.teamPoints[i].color,
        borderSkipped: "left",
        barPercentage: 1,
        categoryPercentage: 1,
        borderColor: '#fff',
        borderWidth: 1
      }
      dataSets.push(dataSet)
    }
    this.teamsChartData = dataSets

    // Total scores
    let conicGradientArray = []
    for (i=0; i<this.teamPoints.length; i++) {
      conicGradientArray.push(this.teamPoints[i].color+' 0')
      conicGradientArray.push(this.teamPoints[i].color+' '+(100*this.teamPoints[i].offset/offset)+'%')
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
  a {
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
  a.active {
    font-weight: bold;
    background-color: $off-white;
  }
}

#team-content {
  height: 100%;
  width: 85%;
  overflow-y: scroll;
  margin: 20px auto;
  div.hidden{
    display: none;
  }
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
#top {
  ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    li {
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
      span {
        display: inline-block;
        font-size: $medium-small-font-size;
        padding: 2px 5px 2px 15px;
      }
    }
  }
  .action-icon {
    flex-basis: $action-list-icon-size;
    width: $action-list-icon-size;
    height: $action-list-icon-size;
  }
  .action-text {
    width: 100%;
  }
  .action-count {
    font-weight: bold;
    font-size: $medium-small-font-size;
  }
  .progress-bar {
    height: 8px;
    background-color: $dark-grey;
    width: 70%;
    display: inline-block;
    margin-left: 10px;
    .progress {
     height: 8px;
     background-color: $progress-bar-color;
     padding: 0px;
   }
  }
}

/* TOTAL WEEK */
#total-week {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  img {
    width: 25%;
    margin-bottom: 30px;
  }
  #total-week-board {
    height: 100%;
    width: 50%;
    background-image: url("../assets/img/total_week_board.png");
    background-position: center;
    background-size: 110% auto;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #bar-chart-wrapper {
    position: relative;
    display: block;
    width: 65%;
    padding-top: 20%;
    margin: 0 15%;
  }
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
  align-items: center;
  justify-content: center;
  padding-top: 50px;

  /* Pie chart */
  #pie-chart {
    border: 1px solid white;
    width: 30vh;
    height: 30vh;
    border-radius: 100%;
    flex: none;
  }

  #pie-chart-caption-container {
    text-align: center;
    padding-top: 2%;
    max-width: 35%;
    display: flex;
  }

  .chart-caption {
    display: inline;
    padding: 1px;
    wrap: nowrap;
  }
  .chart-caption .caption-color:before {
    display: inline-block;
    content: "";
    width: 12px;
    height: 12px;
    margin-left: 5px;
    border-radius: 2px;
    background: currentColor;
  }

  .caption-color, .caption {
    padding: 1px;
  }
}

/* Medium screens */
@media (max-width:992px) and (min-width:601px) {
  .w3-bar-item {
    font-size: $small-font-size;
  }

  #total-week-board {
    width: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

/* Small screens */
@media (max-width:600px) {
  .w3-bar-item {
    font-size: $small-font-size;
  }
  #total {
    background-size: 100% auto;
    background-position: center center;
    padding: 50px;
  }

  #total-week-board {
    width: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>
