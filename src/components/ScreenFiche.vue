<template>
  <div id="fiche">
    <header>{{ $t("fiche.header") }}</header>
    <!-- Category Navbar -->
    <div id="fiche-navbar" class="w3-bar">
        <a v-for="category in categories" :key="category.id" @click.prevent="changeCategory($e,category)"
        :class="(currentCategory.id === category.id ? 'active' : '')+' w3-bar-item w3-display-container w3 center'"
        :style="'--catcolor:'+category.color">
          <div class="category-background w3-display-topmiddle"></div>
          <div class="category-icon w3-circle w3-display-topmiddle"
            :style="'background-image: url('+path+category.icon+')'"></div>
          <span class="w3-display-bottommiddle">{{ category.name }}</span>
        </a>
    </div>
    <ul id="actions">
      <li v-for="action in actionsByCategory[currentCategory.id]" :key="action.id">
        <div :class="checkedClass(action)+' action-checkbox-wrapper'" @click="actionCheck($e,action)">
          <div class="action-checkbox">
            <div class="w3-round">
              <transition name="fade">
                <div v-if="checkedClass(action)" class="checkmark"></div>
              </transition>
            </div>
          </div>
          <div class="checkbox-animation">
          </div>
        </div>
        <div class="action-card" :for="'action'+action.id">
          <div class="action-icon"><img v-bind:src="path+action.icon"/></div>
          <div class="action-text" :title="action.name">{{ action.name }}</div>
          <button @click.prevent="action.modal=true"><img src="../assets/img/question.svg" /></button>
          <div v-if="action.modal" @click.self="action.modal=false" class="modal-backdrop">
            <div class="modal">
              <div class="modal-body">
                <h3>{{ $t("fiche.help_header") }}</h3>
                <p class="modal-name">{{ action.name }}</p>
                <img class="action-icon" v-bind:src="path+action.icon"/>
                <p class="modal-desc" v-html="action.description"></p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../services/store.js'
import Request from '../services/Request.js'


export default {
  name: 'ScreenFiche',
  data(){
    return {
      categories: [],
      actionsByCategory: [],
      path: process.env.VUE_APP_API_IMG_ROOT,
      currentCategory: {id:0},
      store
    }
  },
  methods : {
   changeCategory(e, category){
     this.currentCategory = category
   },
   async actionCheck(e, action){
     if (!action.checked) {

       let weekId = this.store.get('activeWeek').week_id

       // For animation
       action.animating = "checking"
       setTimeout(function(){ action.animating = "" }, 1000);

       let childId = this.store.get('childId')
       let newActionDone = await Request.newActionDone(childId, action.id, weekId)
       action.checked = true
       action.actionDoneId = newActionDone.id

    } else {

      // For animation
      action.animating = "unchecking"
      setTimeout(function(){ action.animating = "" }, 1000);

      if (action.actionDoneId) {
        Request.deleteActionDone(action.actionDoneId)
        action.checked = false
      }
    }
     //setTimeout(function () { this.fetchHole() }.bind(this), 1000)
   },
   checkedClass(action) {
     let checkedClass = action.checked ? 'checked' : ''
     checkedClass += action.animating ? ' '+action.animating : ''
     return checkedClass
   }
  },
  async mounted() {

    // Get categories and actions
    this.categories = this.store.get('categories')
    this.actionsByCategory = this.store.get('actionsByCategory')

    // Set current category
    this.currentCategory = this.categories[0]

    // get actionsDone of user for the current week
    let childId = this.store.get('childId')
    let config = { params: { week_id: this.store.get('activeWeek').week_id }}
    let childActionsDone = await Request.childActionsDone(childId, config)

    for (var i = 0; i < this.categories.length; i++) {
      // load actions of each category
      var actions = await Request.categoryActions(this.categories[i].id)

      this.actionsByCategory[this.categories[i].id] = actions
    }

    // load checked actions (actionDone)
    for (var j = 0; j < childActionsDone.length; j++) {
      var actionDone = childActionsDone[j];
      // Find category by name...
      var category = this.categories.find((category) => category.name === actionDone.category_name)
      if (category) {
        // Find action by name...
        var action = this.actionsByCategory[category.id].find(action => action.name === actionDone.action_name)
      }
      if (action) {
        action.checked = true;
        action.actionDoneId = actionDone.id
      }
    }

    this.changeCategory(null, this.categories[0])
  }
}


</script>

<style lang="scss" scoped>
#fiche {
  padding: 30px 10px 20px 20px;
  border-radius: 10px;
  background-image: url($scrunched-paper-img);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  @include default-text();
  font-size: $medium-large-font-size;
  flex: 0 0 auto;

}

#fiche-navbar {
  flex: 0 0 auto;
  width: auto;
}

#fiche-navbar a {
  @include category-button();
  margin: 8px;
  padding: 0px;
  text-align: center;

}

#fiche-navbar a.active .category-background {
  @include category-button();

  background-image: linear-gradient(var(--catcolor), $category-button-gradient-color);
  opacity: 0.7;
}

#fiche-navbar a .category-icon {
  display: block;
  height: $category-icon+px;
  width: $category-icon+px;
  background: white;
  background-size: ($category-icon - 5)+px ($category-icon - 5)+px;
  background-position: center;
  background-repeat: no-repeat;
  margin: 6px auto;

  box-shadow: $button-drop-shadow;
}

#fiche-navbar a:hover .category-icon {
  height: ($category-icon + 5)+px;
  width: ($category-icon + 5)+px;
  background-size: $category-icon+px $category-icon+px;
  margin: 4px auto;
}

#fiche-navbar a.active .category-icon {
  height: ($category-icon + 5)+px;
  width: ($category-icon + 5)+px;
  background-size: ($category-icon - 2)+px ($category-icon - 2)+px;
  border: solid 3px $black;
  margin: 4px auto;
}

#fiche-navbar a span {
  @include default-text();

  text-transform: uppercase;
  font-size: 10px;
  display: block;
  margin: auto;
}

#fiche-navbar a:hover span, #fiche-navbar a.active span {
  color: var(--catcolor);
  font-size: 10.5px;
  text-shadow: 0.2px 0.2px 1px var(--catcolor);
}

#actions {
  overflow-y: auto;
  padding: 0px;
  list-style-type: none;
}

#actions li {
  margin: 7px 7px 7px 0px ;
}

.action-checkbox-wrapper {
  float: left;
  width: 50px;
  height: 50px;
  margin: 6px 20px 0 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-checkbox-wrapper.checked, .action-checkbox-wrapper:hover{
  background-color: #38cf60;
}

.action-checkbox .w3-round{
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid black;
  background-color: white;
}

.action-checkbox .w3-round .checkmark {
  background-image: url('../assets/img/checked_mark.png');
  background-repeat: no-repeat;
  background-position: 2px 1px;
  width: 100%;
  height: 100%;
}

// Checkmark fade in and out
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.action-checkbox-wrapper {
  position: relative;
}

.action-checkbox-wrapper:hover .checkbox-animation {
  background-image: url('../assets/img/pen.png');
  background-repeat: no-repeat;
  background-position: 20px 4px;
}

.action-checkbox-wrapper.checked:hover .checkbox-animation {
  background-image: url('../assets/img/eraser.png');
  background-repeat: no-repeat;
  background-position: 18px 7px;
}

.action-checkbox-wrapper.checking .checkbox-animation, .action-checkbox-wrapper.checking:hover .checkbox-animation {
  background-image: url('../assets/img/draw.gif');
  background-position: -2px -7px;
  background-size: 110%;
}

.action-checkbox-wrapper.unchecking .checkbox-animation, .action-checkbox-wrapper.unchecking:hover .checkbox-animation {
  background-image: url('../assets/img/erase.gif');
  background-position: -2px -2px;
  background-size: 110%;
}

.checkbox-animation {
  position: absolute;
  width: 50px;
  height: 50px;
}

#actions .action-card {
  @include default-text();
  font-size: 17px;

  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 5px;
  border: none;
  background: $action-list-bg-color;
  box-shadow: $button-drop-shadow;
}

#actions .action-icon {
  min-width: 60px;
  min-height: 60px;
  padding: 3px 0px;
  flex: 1;
}

#actions .action-icon img {
  max-width: 60px;
  max-height: 60px;
  padding-left: 5px;
  border-radius: 5px;
  margin: auto;
}

#actions .action-text {
  padding: 3px;
  flex: 100;
  margin-right: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#actions .action-card button {
  font-family: Arial;
  flex: 0;
  border: 4px solid #474775;
  border-radius: 100px;
  height: 30px;
  width: 30px;
  margin-right: 8px;
  cursor: pointer;
  display: none;
}
#actions .action-card button img {
  width: 15px;
  height: 15px;
  transform: translate(-3px, -1px);
}

#actions .action-card:hover .action-text {
  margin-right: 0px;
}

#actions .action-card:hover button {
  display: block;
}

// Modal
#actions .modal-backdrop {
  @include modal-backdrop();
  z-index: 10;
}

#actions .modal {
  background: #3aa6ce;
  border-radius: 20px;
  width: 30%;
  min-width: 500px;
  color: $white;
  font-family: $credits-font-face;
  text-shadow: none;
}

#actions .modal-body {
  font-family: $credits-font-face;
  position: relative;
  padding: 20px 30px 80px 30px;
}

#actions .modal-body h3 {
  font-family: $credits-font-face;
  font-weight: bolder;
  font-size: $xlarge-font-size;
  margin: 10px 0px;
  text-align: center;
}

#actions .modal-body .modal-name {
  font-size: 20px;
  font-weight: bold;
  display: block;
  text-align: center;
  margin-bottom: 60px;
}

#actions .modal-body img {
  float: left;
  width: 20%;
  height: auto;
  box-shadow: $button-drop-shadow;
  font-size: 13px;
  margin: 15px 0
}

#actions .modal-body .modal-desc {
  color: black;
  text-align: justify;
  font-size: 15px;
  float: right;
  width: 70%;
  margin-bottom: 40px;
}

#actions .modal-body p a {
  color: $credits-links-color;
  text-decoration: none;
}

/* Scrollbar */
#actions::-webkit-scrollbar {
  width: 12px;
}
/* Handle */
#actions::-webkit-scrollbar-thumb {
  background: $scrollbar-color;
  border-radius: 10px;
}
/* Handle on hover */
#actions::-webkit-scrollbar-thumb:hover {
  background: $medium-grey;
}

</style>
