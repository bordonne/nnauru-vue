<template>
  <div id="login">
    <div id="version"><span class="w3-large">v {{ version }} </span></div>
    <div id="login-container" class="w3-display-container w3-center">
      <img src="../assets/img/login_board.png" class="w3-image" />
      <div class="app-title w3-display-topmiddle">
        <h1>{{ $t("app_title") }}</h1>
        <h2>{{ $t("login.subtitle") }}</h2>
      </div>
      <!-- Login form -->
      <form v-if="!serverError" class="w3-display-middle">
        <input type="text" v-model="username" v-bind:placeholder="$t('login.placeholder_username')" required autofocus :class="error" />
        <input type="password" v-model="password" v-bind:placeholder="$t('login.placeholder_password')" required :class="error" />
        <button type="submit" @click.prevent="handleSubmit" :disabled="disabled"> {{ $t("login.submit_button") }} </button>
        <div id="errormsg">{{ formMessage }}</div>
      </form>
      <div v-else id="server-error" class="w3-display-middle" v-html='errorMsg'></div>
    </div>

    <!-- Credits Modal -->
    <CreditsModal />
  </div>

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
      version: process.env.VUE_APP_VERSION,
      username: "",
      password: "",
      formError: false,
      formMessage: "",
      serverError: false,
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

          this.formMessage = this.$t("login.connection")

          // Save sign in credentials in store
          this.store.set('loggedIn', true)
          this.store.set('username', this.username)
          this.store.set('credentials', btoa(`${this.username}:${this.password}`))

          // Save childId
          let childId = await Request.childId(this.username)
          this.store.set('childId', childId)

          // Save childs team color
          let teams = await Request.teams()
          for (var i=0; i<teams.length; i++){
            let teamChildren = await Request.teamChildren(teams[i].id)
            let names = teamChildren.map((value) => value.pseudo)
            if (names.includes(this.username)) {
              this.store.set('team', teams[i])
              break
            }
          }

          // Save weeks
          try {
            let current_week = await Request.current_week()
          } catch (periodError) {
            this.serverError = true
            this.errorMsg = this.$t("login.period_error")
          }
          let current_week = await Request.current_week()

          let week = {
            week_id: current_week.id,
            startDate: current_week.begin,
            endDate: current_week.end,
          }
          this.store.set('currentWeek', week)
          this.store.set('activeWeek', week)
          let previous_week = await Request.previous_week()
          this.store.set('previousWeek', {
            week_id: previous_week.id,
            startDate: previous_week.begin,
            endDate: previous_week.end
          })

          // Save categories and JSON metadata for impact
          let categories = await Request.categories()
          this.store.set('categories', categories)

          // Save impact
          let impact = await Request.impact({params: {week_id: week.id}})
          this.store.set('impact', impact)

          // Save actions
          let actions = await Request.actions()
          this.store.set('actions', actions)

          // Save actions by category
          let actionsByCategory = []
          for (i = 0; i < categories.length; i++) {
            // load actions of each category
            var categoryActions = await Request.categoryActions(categories[i].id)
            actionsByCategory[categories[i].id] = categoryActions
          }
          this.store.set('actionsByCategory', actionsByCategory)

          this.$emit('login', true)

        } catch (error) {
          if (process.env.NODE_ENV == "development") console.log(error)
          this.formError = true
          this.formMessage = this.$t("login.connection_error")

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
      return (this.formError ? "error" : "")
    }
  },
  components: {
    CreditsModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@font-face {
  font-family: $title-font-face;
  src: url($title-font-face-url) format('truetype');
}

#login {
  @include full-window();
  display: flex;
  flex-direction: column;
}

#version {
  margin-top:2px;
  font-size: $medium-font-size;
  color: $medium-grey;
  align-self: flex-end;
  padding-right: 5px;
}

#login-container {
  margin-top:30px;
}

.app-title {
  width: 100%;
  margin-top: 22px;
}

.app-title h1, .app-title h2 {
  font-family: $title-font-face;
}

h1 {
  margin-bottom: 0px;
}

h2 {
  margin-top: 0px;
}

input {
  font-size: $input-font-size;
  margin: 5px 0px;
  padding: 15px;
  width: 100%;
  height: 50px;

  border-radius: 100px;
  border: 1px solid $input-border-color;

  font-family:Verdana,sans-serif;
  caret-color: $input-caret-color;
}

input:focus {
  border-color: $input-focus-border-color;
}

input.error, input.error:focus {
  border-color: $input-error-border-color;
}

button {
  text-transform: uppercase;
  width: 110px;
  margin: 15px;
  padding: 7px;
  border-radius: 5px;
  border: 0px;
  background: $button-bg-color;
  color: $button-text-color;

  box-shadow: $button-drop-shadow;
}

button[disabled] {
    opacity: 0.3;
}

#errormsg {
  font-style: italic;
  font-size: $small-font-size;
  height: $small-font-size;
}

#server-error {
  //font-family: $title-font-face;
  font-size: 18px;
  text-align: justify;
}

/* Large screens */
@media (min-width:993px) {
  h1 {
    font-size: 80px;
  }
  h2 {
    font-size: 30px;
  }
  form, #server-error {
    width: 240px;
    margin: 70px 40px;
  }
}

/* Medium screens */
@media (max-width:1280px) and (min-width:897px), (max-height:800px) and (min-height:415px) {
  h1 {
    font-size: 70px;
  }
  h2 {
    font-size: 30px;
  }
  form, #server-error {
    width: 35vw;
    max-width: 240px;
    margin: 70px 40px;
  }
  input {
    font-size: 16px;
  }
  #login-container {
    margin-top: 0px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

/* Small screens */
@media (max-width:896px) and (max-height:414px) {
  #login {
    margin-top: auto;
  }
  h1 {
    font-size: 60px;
  }
  h2 {
    font-size: 20px;
  }
  form, #server-error {
    width: 35vw;
    margin: 60px 5vw;
  }
  input {
    font-size: 12px;
  }
  #login-container {
    margin-top: 0px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>
