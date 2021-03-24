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

    <!-- Toggle credits -->
    <div id="credits">
      <a @click.prevent="showCredits=true" class="w3-small"> {{ $t("credits.toggle") }} </a>
    </div>
    <!-- Credits Modal -->
    <transition name="modal">
      <div v-if="showCredits" @click.self="showCredits=false" class="modal-backdrop">
        <div class="modal">
          <section class="modal-body">
            <slot>
              <h3>{{ $t("credits.real") }}</h3>
              <p>{{ $t("credits.real_text") }}</p>
            </slot>
            <slot>
              <h3>{{ $t("credits.resources") }}</h3>
              <p>{{ $t("credits.resources_text") }}</p>
              <p id="links" v-html='$t("credits.links")'>
              </p>
            </slot>
           </section>
        </div>
      </div>
    </transition>
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
      version: process.env.VUE_APP_VERSION,
      username: "",
      password: "",
      formError: false,
      formMessage: "",
      serverError: false,
      errorMsg: "",
      showCredits: false,
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

          this.formMessage = this.$t("login.connection") // Loading message

          // Save credentials in store
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

          // Save categories
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
            // Load actions of each category
            var categoryActions = await Request.categoryActions(categories[i].id)
            actionsByCategory[categories[i].id] = categoryActions
          }
          this.store.set('actionsByCategory', actionsByCategory)

          this.$emit('login', true) // Only when everything is successfully loaded

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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@font-face {
  font-family: $title-font-face;
  src: url($title-font-face-url) format('truetype');
}
@font-face {
  font-family: $credits-font-face;
  src: url($credits-font-face-url) format('truetype');
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
  h1, h2 {
    font-family: $title-font-face;
    font-weight: normal;

    background: -webkit-linear-gradient(90deg, $second-gradient-color 0%, $first-gradient-color 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow($title-drop-shadow);
  }
  h1 {
    margin-bottom: 0px;
  }
  h2 {
    margin-top: 0px;
  }
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

  box-shadow:none; // For Firefox
}

input:focus {
  border-color: $input-focus-border-color;
}

input.error, input.error:focus {
  border-color: $input-error-border-color;
}


/* Input placeholder color */
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: $placeholder-color;
  opacity: 1; /* Firefox */
}
::-ms-input-placeholder { /* Microsoft Edge */
  color: $placeholder-color;
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
  font-size: 18px;
  text-align: justify;
}

// Credits style
#credits {
  align-self: flex-end;
  color: $medium-grey;
  font-style: italic;
  padding-right: 15px;
  padding-bottom: 15px;
  bottom: 0px;
  position: absolute;
  #links a {
    padding: 15px;
    font-style: italic;
    color: $medium-grey;
    cursor: pointer;
  }
}

.modal-backdrop {
  @include modal-backdrop();
  z-index: 5;
}

.modal {
  background: $white;
  box-shadow: 2px 2px 30px 1px;
  border-radius: 2px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  .modal-body {
    font-family: $credits-font-face;
    color: black;
    position: relative;
    padding: 60px 60px 80px 30px;
    h3 {
      font-family: $credits-font-face;
      font-weight: bolder;
      font-size: $large-font-size;
      margin: 10px 0px;
    }
    p {
      font-weight: bold;
      a {
        color: $credits-links-color;
        text-decoration: none;
      }
    }
    p#links a{
      font-size: $small-font-size;
      font-weight: bold;
    }
  }
  /* Modal transition */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
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
