<template>
  <div id="me">
    <header>{{ $t("me.header") }}
      <div id="trees">
        <div class="tree-wrapper" v-for="action in actionsDone" :key="action.id">
          <transition name="tree" @before-enter="beforeEnterTree" @enter="enterTree">
            <!-- Tree -->
            <svg v-if="action.show" class="tree" visibility="visible" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="42" height="66.4" viewBox="0 0 236.287 363.1">
              <defs>
                <filter id="a" x="91.207" y="179" width="53" height="162" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha"/>
                  <feGaussianBlur stdDeviation="3" result="b"/>
                  <feFlood flood-opacity="0.161"/>
                  <feComposite operator="in" in2="b"/>
                  <feComposite in="SourceGraphic"/>
                </filter>
                <filter id="c" x="9.845" y="0" width="217.362" height="252" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha"/>
                  <feGaussianBlur stdDeviation="3" result="d"/>
                  <feFlood flood-opacity="0.161"/>
                  <feComposite operator="in" in2="d"/>
                  <feComposite in="SourceGraphic"/>
                </filter>
                <filter id="e" x="0" y="270" width="236.287" height="93.1" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha"/>
                  <feGaussianBlur stdDeviation="3" result="f"/>
                  <feFlood flood-opacity="0.161"/>
                  <feComposite operator="in" in2="f"/>
                  <feComposite in="SourceGraphic"/>
                </filter>
              </defs>
              <g id="tri" transform="translate(1125.207 -3045)">
                <g class="f" transform="matrix(1, 0, 0, 1, -1125.21, 3045)">
                  <rect class="a" width="35" height="144" transform="translate(100.21 185)"/>
                </g>
                <g class="e" transform="matrix(1, 0, 0, 1, -1125.21, 3045)">
                  <path class="b" d="M94.739,207.121C85.225,219.158,67.847,226,52.861,226,27.181,226,.512,200.552.512,171.833c-3.033-25.527,7.843-38,20.912-44.085A49.573,49.573,0,0,1,55.8,70.025a49.505,49.505,0,1,1,94.556-20.9A49.5,49.5,0,0,1,180.2,135.092a56.5,56.5,0,1,1-85.458,72.028Z" transform="translate(18.85 6)"/>
                </g>
                <g class="d" transform="matrix(1, 0, 0, 1, -1125.21, 3045)">
                  <path class="c" d="M0,62.51C7.779,26.3,37.828,19.37,61.053,19.748,68.355,8.248,88.211,0,111.56,0c23.522,0,43.5,8.371,50.668,20,28.355.159,40.675,4.6,54.041,31.521,4.271,8.54,2.585,25.418-19.6,23.263H87.062q0,.107,0,.212H13.571q-1.165.1-2.2.1C-2.313,75.1,0,62.51,0,62.51Z" transform="translate(9.15 276)"/>
                </g>
              </g>
            </svg>

          </transition>
        </div>
        <div id="trees-base"></div>
      </div>
    </header>
    <div id="points" :style="'font-size: '+(15+pointsCount)+'px'">
      {{ pointsCount }} {{ $t('me.points') }}
    </div>
    <div id="action-cards">
      <div v-for="action in actionsDone" :key="action.id">
        <transition name="card">
          <div v-if="action.show" :class="'flip-card '+action.clicked"
              @click.prevent="action.clicked = (action.clicked === 'clicked') ? '' : 'clicked'">
            <div class="flip-card-inner" :class="action.show ? 'show' : ''">
              <div :style="'background-color:'+action.color" class="flip-card-front">
                <img :src="path+action.icon" alt="icon" />
              </div>
            <div :style="'background-color:'+action.color" class="flip-card-back" :title="action.action_name">
              <span>{{ action.action_name }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    </div>
  </div>
</template>

<script>
import store from '../services/store.js'
import Request from '../services/Request.js'
import gsap from 'gsap'

export default {
  name: 'ScreenMe',
  data(){
    return {
      actionsDone: [],
      categoryActions: [],
      pointsCount: 0,
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
      this.actionsDone[i].show = false
    }

    // Points counter animation
    var pointsInterval = setInterval(() => {
      if (this.pointsCount == this.actionsDone.length) {
        clearInterval(pointsInterval)
      } else {
        this.actionsDone[this.pointsCount].show = true
        this.pointsCount++
      }
    }, 150)

  },
  methods: {
    beforeEnterTree(el) {
       el.setAttribute('height', 0)
    },
    enterTree(el, done) {
      let tW = 42
      let tH = 66.4

      let newHeight = Math.random() * 0.5 * tH + 0.5 * tH
      let newWidth = newHeight * tW/tH

      gsap.to(el, {
        duration: 0.5,
        height: newHeight,
        width: newWidth,
        onComplete: done
      })

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
  padding: 40px 20px 0px 20px;
  display: flex;
  flex-direction: column;
}

#trees {
  margin: 0px 20px;
}

#trees .tree-wrapper {
  display: inline-block;
  transform: translateY(8px);
}


#trees .tree {
  display: inline-block;
  margin: -2px;
}

// Tree svg style
#trees .tree .a {fill:#9fcba5;}
#trees .tree .b {fill:#3c9e5d;}
#trees .tree .c {fill:#2b7b57;}
#trees .tree .d {filter:url(#e);}
#trees .tree .e {filter:url(#c);}
#trees .tree .f {filter:url(#a);}

#trees-base {
  display: block;
  height: 50px;
  background-color: $trees-base-color;
  border: 10px solid $trees-base-border-color;
  border-left: none;
  border-right: none;
  box-shadow: $button-drop-shadow;
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

#action-cards .flip-card:hover {
  transform: scale(1.05);
}

// Flipcard enter transition
.card-enter-active {
  transition: all 1s ease;
}
.card-enter-from {
  opacity: 0;
  transform: scale(0.1);
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
