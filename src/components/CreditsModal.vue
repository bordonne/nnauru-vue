<template>
  <!-- Toggle credits -->
  <div id="credits"><a @click.prevent="showCredits=true"> {{ $t("credits.toggle") }} </a></div>

  <transition name="modal">
    <div v-if="showCredits" @click.self="showCredits=false" class="modal-backdrop">
      <div class="modal">
        <section class="modal-body">
          <slot>
            <h3>{{ $t("credits.real") }}</h3>
            <p>© Nnauru 2020</p>
          </slot>
          <slot>
            <h3>{{ $t("credits.ressources") }}</h3>
            <p>Freepik, Brgfx</p>
            <p id="links">
              <a target="_blank" href="https://www.freepik.com/free-photos-vectors/floral">Floral vector created by freepik - www.freepik.com</a><br/>
              <a target="_blank" href="https://www.freepik.com/free-photos-vectors/Border">Border vector created by brgfx - www.freepik.com</a><br/>
              <a target="_blank" href="https://www.freepik.com/free-photos-vectors/Banner">Banner vector created by brgfx - www.freepik.com</a><br/>
              <a target="_blank" href="https://www.freepik.com/free-photos-vectors/Frame">Frame vector created by brgfx - www.freepik.com</a><br/>
              <a target="_blank" href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>
            </p>
          </slot>
         </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CreditsModal',
  data(){
    return {
      showCredits: false,
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: Comfortaa;
  src: url('../assets/fonts/Comfortaa.ttf');
}

#credits {
  width: 100%;
}
#credits a {
  float: right;
  padding: 15px;
  color: #aaa;
  font-style: italic;
  font-size: 13px;
  cursor: pointer;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 30px 1px;
  border-radius: 2px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.modal-body {
  font-family: Comfortaa;
  color: black;
  position: relative;
  padding: 60px 60px 80px 30px;
}

.modal-body h3 {
  font-weight: bolder;
  font-size: 28px;
  margin: 10px 0px;
}

.modal-body p {
  font-weight: bold;
}

.modal-body p a{
  color: blue;
  text-decoration: none;
}

.modal-body p#links a{
  font-size: 13px;
  font-weight: bold;
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

</style>
