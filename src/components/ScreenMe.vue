<template>
  <div id="me">
    <header>{{ $t("me.header") }}</header>
    <div id="trees">
    </div>
    <div id="points">
      {{ actionsDone.length }} {{ $t('me.points') }}
    </div>
    <div id="actionCards">
      <a v-for="action in actionsDone" :key="action.id" > {{ action.category_name }}:{{ action.action_name }} </a>
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
      username: store.get('username'),
      meId: null,
      actionsDone: [],
      categoryActions: [],
    }
  },
  async mounted() {
    let meId = await Request.childId(this.username)
    this.meId = meId.data.id

    console.log(this.meId)

    let actionsDone = await Request.childActionsDone(this.meId)
    this.actionsDone = actionsDone.data

    console.log(this.actionsDone)

  }
}
</script>

<style lang="scss" scoped>
#me {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-left: 20px;
  border-radius: 10px;
  background: #f5f6e6;
}

#actionCards a {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px;
  border: 1px solid black;
}
</style>
