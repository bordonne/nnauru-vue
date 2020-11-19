<template>
  <div id="mobile">
    <h2>{{ $t("mobile.app_link_title") }}</h2>
    <a class="button" :href="appLink" >{{ $t("mobile.dowload") }}</a>
  </div>
</template>

<script>
export default {
  name: 'MobileScreen',
  data(){
    return {
      appLink: process.env.VUE_APP_MOBILE_APP_LINK_ANDROID
    }
  },
}
</script>

<style lang="scss" scoped>
#mobile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  text-align: center;
  width: 400px;
}

a {
  text-decoration: none;
  text-transform: uppercase;
  color: $white;
  display: block;
  background: $first-gradient-color;
  background: linear-gradient(59deg, $first-gradient-color 0%, $second-gradient-color 100%);
  width: 200px;
  padding: 25px;
  text-align: center;
  border-radius: 5px;
  box-shadow: $card-drop-shadow;
}

</style>
