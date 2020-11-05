<template>
  <div id="app-wrapper">
    <MainScreen v-if="loggedIn" />
    <LoginScreen v-else @login="onLogin" />
  </div>
</template>

<script>
import LoginScreen from './components/LoginScreen.vue'
import MainScreen from './components/MainScreen.vue'
import store from './services/store.js'


export default {
  name: 'App',
  data(){
    return {
      loggedIn: false,
      store
    }
  },
  methods: {
    onLogin(value) {
      this.loggedIn = value
    }
  },
  components: {
    LoginScreen,
    MainScreen
  }
}
</script>

<style>
#app-wrapper {
  background-color: #e7f7f7;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Global styling */


</style>
