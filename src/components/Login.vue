<template>
  <div id="login">
      <h1>SOS planète</h1>
      <h2>Agissons pour le vivant</h2>

      <!-- Login form -->
      <form>
        <input id="username" type="text" v-model="username" placeholder="Entrer votre pseudo..." required autofocus />
        <input id="password" type="password" v-model="password" placeholder="Mot de passe..." required />
        <button type="submit" @click="handleSubmit" :disabled="disabled"> Connexion </button>
      </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios"; // Library for API calls

export default {
  name: 'Login',
  data(){
    return {
      username : "",
      password : ""
    }
  },
  methods : {
    // Form submission
    handleSubmit(e){
      e.preventDefault();

      if (this.password.length > 0) {
        axios.get(process.env.VUE_APP_API_ROOT+'check_auth', {
          auth: {
            username: this.username,
            password: this.password
          }
        }).then(function(response) {
          alert('Success');
        }).catch(function(error) {
          alert('Error on Authentication');
        });
      }
    }
  },
  computed: {
    // Disabling & enabling the form submission button
    disabled(){
      return !(this.username && this.password);
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

h1, h2 {
  font-family: LoginFont;
}

h1 {
  font-size: 80px;
  font-weight: normal;

  background: -webkit-linear-gradient(90deg, rgba(144,237,146,1) 0%, rgba(133,209,222,1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 4px #444);

  margin-bottom: 0px;
}

h2 {
  font-weight: normal;
  color:#8de2b3;

  text-shadow: 2px 2px 4px #444;

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
</style>
