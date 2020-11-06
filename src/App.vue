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

<style>
/* Global styling */

#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1;
  background-color: #e7f7f7;
}

*:focus {
    outline: none;
}

.app-title h1, .app-title h2 {
  font-family: LoginFont;
  font-weight: normal;

  background: -webkit-linear-gradient(90deg, #90ee90 0%, #87ceeb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 4px #444);
}

/* Input placeholder color */
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #999;
  opacity: 1; /* Firefox */
}
::-ms-input-placeholder { /* Microsoft Edge */
  color: #999;
}

</style>
