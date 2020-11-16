<template>
  <div id="me">
    <header>{{ $t("me.header") }}
      <div id="trees">
      </div>
    </header>
    <div id="points">
      {{ actionsDone.length }} {{ $t('me.points') }}
    </div>
    <div id="action-cards">
      <div v-for="action in actionsDone" :key="action.id" :class="'flip-card '+action.clicked"
          @click.prevent="action.clicked = (action.clicked === 'clicked') ? '' : 'clicked'">
        <div class="flip-card-inner">
          <div :style="'background-color:'+action.color" class="flip-card-front">
            <img :src="path+action.icon" alt="icon" />
          </div>
        <div :style="'background-color:'+action.color" class="flip-card-back">
          <span>{{ action.action_name }}</span>
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
  name: 'ScreenMe',
  data(){
    return {
      actionsDone: [],
      categoryActions: [],
      path: process.env.VUE_APP_API_IMG_ROOT,
      store
    }
  },
  async mounted() {
    let childId = this.store.get('childId')
    this.actionsDone = await Request.childActionsDone(childId)

    let categories = await Request.categories()
    let actions = await Request.actions()

    // Get colors of each category
    let categoriesColors = {}
    categories.map(category => categoriesColors[category.name] = category.color)

    // Get icons of each action
    let actionsIcons = {}
    actions.map(action => actionsIcons[action.name] = action.icon)

    // Assign colors and icons to actionsDone
    for (var i=0; i<this.actionsDone.length; i++){
      this.actionsDone[i].color = categoriesColors[this.actionsDone[i].category_name]
      this.actionsDone[i].icon = actionsIcons[this.actionsDone[i].action_name]
      this.actionsDone[i].clicked = '' // for the flipping card animation
    }

  }
}
</script>

<style lang="scss" scoped>
#me {
  width: 100%;
  height: 100%;

  padding-bottom: 20px;
  border-radius: 10px;
  background-color: $off-white;
  display: flex;
  flex-direction: column;
}

header {
  @include default-text();
  font-size: 30px;
  background-color: $trees-bg-color;
  padding: 40px 10px 20px 20px;
}

#points {
  font-family: $default-font-stack;
  width: 100%;
  height: 100px;
  text-align: center;
  padding: 20px;
  font-size: 34px;
  color: $points-color;
}

#action-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 0px 70px;
  overflow-y: scroll;
}

#action-cards .flip-card {
  display: inline-block;
  width: $flipcard-size;
  height: $flipcard-size;
  margin: 5px;

  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card.clicked .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  color: black;
  line-height: $flipcard-size;
}

.flip-card-front img {
  max-width: $flipcard-size;
  max-height: $flipcard-size;
  padding: 4px;
}

.flip-card-back {
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card-back span {
  padding: 2px;
  line-height: 1.1;
  color: white;
  overflow: hidden;
  text-align: center;
  font-size: $small-font-size;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

/* Small screens */
@media (max-width:600px) {
  #points {
    height: 40px;
  }
  #action-cards {
    margin: 20px;
  }
}
</style>
