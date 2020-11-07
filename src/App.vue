<template>
  <MainScreen v-if="loggedIn" />
  <LoginScreen v-else @login="onLogin" />
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

<style lang="scss">
/* Global styling */

#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: $default-font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1;
  background-color: $default-bg-color;
}

*:focus {
    outline: none;
}

.app-title h1, .app-title h2 {
  font-weight: normal;

  background: -webkit-linear-gradient(90deg, $second-gradient-color 0%, $first-gradient-color 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: $default-drop-shadow;
}

/* Input placeholder color */
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: $placeholder-color;
  opacity: 1; /* Firefox */
}
::-ms-input-placeholder { /* Microsoft Edge */
  color: $placeholder-color;
}

</style>
