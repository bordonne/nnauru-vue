<template>
  <div id="fiche">
    <header>{{ $t("fiche.header") }}</header>
    <!-- Category Navbar -->
      <div id="fiche-navbar" class="w3-bar">
          <a v-for="category in categories" :key="category.id" @click.prevent="changeCategory($e,category.id)"
          class="w3-bar-item w3-button w3-hide-small w3-hover-white">
            <img v-bind:src="path+category.icon" />
            {{ category.name }}
          </a>
      </div>
      <div id="actions">
        <div v-for="action in categoryActions" :key="action.id">
          <input type="checkbox" :name="'action'+action.id" :value="action.id"
           @change="actionCheck($e,action.id)">
          <label :for="'action'+action.id"><img v-bind:src="path+action.icon"/> {{ action.name }}</label>
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
      categories: [],
      categoryActions: [],
      path: process.env.VUE_APP_API_IMG_ROOT,
    }
  },
  methods : {
   async changeCategory(e, id){
     let categoryActions = await Request.categoryActions(id)
     this.categoryActions = categoryActions.data
   },
   async actionCheck(e, id){
     console.log("action id :"+id)
   }
  },
  async mounted() {
    let categories = await Request.categories()
    this.categories = categories.data
    // to remove the "_internal" entry
    this.categories.pop()

    // load actions
    this.changeCategory(null, this.categories[0].id)
  }
}


</script>

<style lang="scss" scoped>
#fiche {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-left: 20px;
  border-radius: 10px;
  background-image: url('../assets/img/fiche_bg_img.jpg');
  background-repeat: no-repeat;
  background-size: 100% auto;

}

#fiche-navbar a img, label img {
  width: 40px;
  height: 40px;
}
</style>
