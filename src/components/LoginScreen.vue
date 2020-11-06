<template>
  <div id="version" class="w3-right"><span class="w3-large">v {{ version }} </span></div>
  <div id="login" class="w3-display-container w3-center">
    <img src="../assets/img/login_board.png" class="w3-image" />
    <div class="app-title w3-display-topmiddle">
      <h1>{{ $t("app_title") }}</h1>
      <h2>{{ $t("login.subtitle") }}</h2>
    </div>
    <!-- Login form -->
    <form class="w3-display-middle">
      <input type="text" v-model="username" v-bind:placeholder="$t('login.placeholder_username')" required autofocus :class="error" />
      <input type="password" v-model="password" v-bind:placeholder="$t('login.placeholder_password')" required :class="error" />
      <button type="submit" @click.prevent="handleSubmit" :disabled="disabled"> {{ $t("login.submit_button") }} </button>
      <div id="errormsg">{{ errorMsg }}</div>
    </form>
  </div>

  <!-- Credits Modal -->
  <CreditsModal />

</template>

<script>
import Request from '../services/Request.js'
import store from '../services/store.js'
import CreditsModal from './CreditsModal.vue'

export default {
  name: 'LoginScreen',
  emits: ["login"],
  data(){
    return {
      version: process.env.VUE_APP_PACKAGE_VERSION,
      username: "",
      password: "",
      errorMsg: "",
      store
    }
  },
  methods : {
    // Form submission
    async handleSubmit(e){
      if (this.password.length > 0) {
        try {
          let config = {
            auth: {
              username: this.username,
              password: this.password
            },
          }
          const response = await Request.checkAuth(config)

          // Save sign in credentials in store
          this.store.set('loggedIn', true)
          this.store.set('username', this.username)
          this.store.set('credentials', btoa(`${this.username}:${this.password}`))
          this.$emit('login', true)

        } catch (error) {
          if (process.env.NODE_ENV == "development") console.log(error)
          this.errorMsg = this.$t("login.connexion_error")
        }
      }
    }
  },
  computed: {
    // Disabling & enabling the form submission button
    disabled(){
      return !(this.username && this.password)
    },
    // Sets a class for styling inputs in case of an error
    error(){
      return (this.errorMsg != "" ? "error" : "")
    }
  },
  components: {
    CreditsModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
  font-family: LoginFont;
  src: url('../assets/fonts/SimplyRounded.ttf');
}

#version {
  margin-top:2px;
  font-size: 18px;
  color: #999;
}

#login {
  margin-top:30px;
}

.app-title {
  width: 100%;
  margin-top: 22px;
}

h1 {
  margin-bottom: 0px;
}

h2 {
  margin-top: 0px;
}

input {
  font-size: 18px;
  margin: 5px 0px;
  padding: 15px;
  width: 100%;
  height: 50px;

  border-radius: 100px;
  border: 1px solid #666;

  font-family:Verdana,sans-serif;
  caret-color: #e91e64;
}

input:focus {
  border-color: black;
}

input.error, input.error:focus {
  border-color: red;
}

button {
  text-transform: uppercase;
  width: 110px;
  margin: 15px;
  padding: 7px;
  border-radius: 5px;
  border: 0px;
  background: #49bb74;
  color: #FFF;

  box-shadow: 1px 2px 4px #666;
}

button[disabled] {
    opacity: 0.3;
}

#errormsg {
  font-style: italic;
  font-size: 13px;
}

/* Large screens */
@media (min-width:993px) {
  h1 {
    font-size: 80px;
  }
  h2 {
    font-size: 30px;
  }
  form {
    width: 240px;
    margin: 70px 40px;
  }
}

/* Medium screens */
@media (max-width:992px) and (min-width:601px) {
  h1 {
    font-size: 70px;
  }
  h2 {
    font-size: 30px;
  }
  form {
    width: 35vw;
    max-width: 240px;
    margin: 70px 40px;
  }
  input {
    font-size: 16px;
  }
}

/* Small screens */
@media (max-width:600px) {
  #login {
    margin-top: auto;
  }
  h1 {
    font-size: 60px;
  }
  h2 {
    font-size: 20px;
  }
  form {
    width: 35vw;
    margin: 60px 5vw;
  }
  input {
    font-size: 12px;
  }
}

</style>
