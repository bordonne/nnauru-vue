<template>
  <span id="version">v {{ version }} </span>
  <div id="login">
    <h1>SOS planète</h1>
    <h2>Agissons pour le vivant</h2>

    <!-- Login form -->
    <form>
      <input type="text" v-model="username" placeholder="Entrer votre pseudo..." required autofocus :class="error" />
      <input type="password" v-model="password" placeholder="Mot de passe..." required :class="error" />
      <button type="submit" @click.prevent="handleSubmit" :disabled="disabled"> Connexion </button>
      <span id="errormsg">{{ errorMsg }}</span>
    </form>
  </div>
</template>

<script>
import Request from '../services/Request.js'
import store from '../services/store.js'

export default {
  name: 'LoginScreen',
  emits: ["login"],
  data(){
    return {
      version : process.env.VUE_APP_PACKAGE_VERSION,
      username : "",
      password : "",
      errorMsg : "",
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
          this.store.set('credentials', btoa(`${this.username}:${this.password}`))
          this.$emit('login', true)

        } catch (error) {
          if (process.env.NODE_ENV == "development") console.log(error)
          this.errorMsg = "Erreur: mauvais pseudo ou mot de passe"
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
  font-family: LoginFont;
  src: url('../assets/fonts/SimplyRounded.ttf');
}

div#login {
  margin-top: 20px;
  display: inline-block;
  background-image: url('../assets/img/login_board.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 622px;
  width:687px;
  text-align: center;
}

span#version {
  float: right;
  color: #444;
}

h1, h2 {
  font-family: LoginFont;
  font-weight: normal;

  background: -webkit-linear-gradient(90deg, #90ee90 0%, #87ceeb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 4px #444);
}

h1 {
  font-size: 80px;
  margin-bottom: 0px;
}

h2 {
  margin-top: 0px;
}

form {
  text-align: center;
  display: inline-block;
  width: 240px;
  padding-top: 100px;
  margin-left: 80px;
}

input {
  display: inline-block;
  font-size: 18px;
  width: 208px;
  height: 20px;
  margin: 5px 0px;
  padding: 15px;

  border-radius: 100px;
  border: 1px solid black;

  font-family:Verdana,sans-serif;
  caret-color: #e91e64;
}

/* Input placeholder color */
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #999;
  opacity: 1; /* Firefox */
}
::-ms-input-placeholder { /* Microsoft Edge */
  color: #999;
}

input.error {
  border-color: red;
}

button {
  display: inline-block;
  text-transform: uppercase;
  width: 100px;
  margin: 15px;
  padding: 5px;
  border-radius: 5px;
  border: 0px;
  background: #49bb74;
  color: #FFF;

  box-shadow: 1px 2px 4px #666;
}

button[disabled] {
    opacity: 0.3;
}

span#errormsg {
  display: inline-block;
  font-style: italic;
  font-size: 13px;
}
</style>
