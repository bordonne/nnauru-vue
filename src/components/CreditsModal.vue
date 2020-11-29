<template>
  <!-- Toggle credits -->
  <div id="credits" class="w3-right">
    <a @click.prevent="showCredits=true" class="w3-small"> {{ $t("credits.toggle") }} </a>
  </div>

  <transition name="modal">
    <div v-if="showCredits" @click.self="showCredits=false" class="modal-backdrop">
      <div class="modal">
        <section class="modal-body">
          <slot>
            <h3>{{ $t("credits.real") }}</h3>
            <p>{{ real }}</p>
          </slot>
          <slot>
            <h3>{{ $t("credits.resources") }}</h3>
            <p>{{ resources }}</p>
            <p id="links" v-html="links">
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
      real: process.env.VUE_APP_CREDITS_REAL,
      resources: process.env.VUE_APP_CREDITS_RESOURCES,
      links: process.env.VUE_APP_CREDITS_LINKS,
    }
  }
}
</script>

<style lang="scss" scoped>

@font-face {
  font-family: $credits-font-face;
  src: url($credits-font-face-url) format('truetype');
}

#credits a {
  padding: 15px;
  font-style: italic;
  color: $medium-grey;
  cursor: pointer;
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
}

.modal-body {
  font-family: $credits-font-face;
  color: black;
  position: relative;
  padding: 60px 60px 80px 30px;
}

.modal-body h3 {
  font-family: $credits-font-face;
  font-weight: bolder;
  font-size: $large-font-size;
  margin: 10px 0px;
}

.modal-body p {
  font-weight: bold;
}

.modal-body p a{
  color: $credits-links-color;
  text-decoration: none;
}

.modal-body p#links a{
  font-size: $small-font-size;
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
