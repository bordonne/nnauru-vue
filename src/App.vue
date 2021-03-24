<template>
  <MobileScreen v-if="mobile" />
  <MainScreen v-else-if="loggedIn" @login="onLogin" />
  <LoginScreen v-else @login="onLogin" />
</template>

<script>
import LoginScreen from './components/LoginScreen.vue'
import MainScreen from './components/MainScreen.vue'
import MobileScreen from './components/MobileScreen.vue'
import store from './services/store.js'


export default {
  name: 'App',
  data(){
    return {
      loggedIn: false,
      mobile: false,
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
    MainScreen,
    MobileScreen
  },
  created() {
    // Condition to display the mobile download link instead of the app
    this.mobile = (screen.width <= 760)
  }
}
</script>

<style lang="scss">
/* Global styling */

#app {
  @include full-window();
  font-family: $default-font-stack;

  line-height: 1;
  background-color: $default-bg-color;
}

*:focus {
    outline: none;
}

</style>
