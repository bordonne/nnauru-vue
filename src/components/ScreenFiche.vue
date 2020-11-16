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
        <input :class="checkedClass(action)" type="checkbox" :name="'action'+action.id" :value="action.id"
          @change="actionCheck($e,action)" />
        <div class="action-card" :for="'action'+action.id">
          <img class="action-icon" v-bind:src="path+action.icon"/>
          <div class="action-text">{{ action.name }}</div>
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

       // For animation
       action.animating = "checking"
       setTimeout(function(){ action.animating = "" }, 1000);

       let config = {
         body: [{
           date: new Date().toISOString().slice(0, 10),
           id_action: action.id
         }]
       }

       let childId = this.store.get('childId')
       let newActionDone = await Request.newActionDone(childId, config)
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
     checkedClass+= action.animating ? ' '+action.animating : ''
     return checkedClass
   }
  },
  async mounted() {
    this.categories = await Request.categories()

    // to remove the "_internal" entry
    this.categories.pop()

    this.currentCategory = this.categories[0]

    // get actionsDone of user
    let childId = this.store.get('childId')
    let childActionsDone = await Request.childActionsDone(childId)

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

#actions input[type=checkbox] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  float: left;
  width: 40px;
  height: 40px;
  margin: 3px 5px 0px 0px;
  background-image: url('../assets/img/check_sprite.png');
  background-size: auto 40px;
  background-position: -1px 0px;
}

#actions input[type=checkbox]:hover {
  background-position: 120px 0px;
}

#actions input[type=checkbox].checked {
  background-position: 41px 0px;
}

#actions input[type=checkbox].checked:hover {
  background-position: 80px 0px;
}

#actions input[type=checkbox].checking {
  background-image: url('../assets/img/checking.gif');
  background-position: 1px 0px;
}

#actions input[type=checkbox].unchecking {
  background-image: url('../assets/img/unchecking.gif');
  background-size: auto 38px;
  background-position: 2px 2px;
  background-repeat: no-repeat;
}

#actions .action-card {
  @include default-text();
  font-size: 14px;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 5px;
  border: none;
  background: $action-list-bg-color;

  box-shadow: $button-drop-shadow;
}

#actions .action-icon {
  width: $action-list-icon-size;
  height: $action-list-icon-size;
  padding: 3px;
}

#actions .action-text {
  padding: 3px;
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
