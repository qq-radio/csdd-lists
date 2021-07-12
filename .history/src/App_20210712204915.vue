<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  el: "app",
  data() {
    return {};
  },
  methods: {
    set_language() {
      if (sessionStorage.hasOwnProperty("language") == false) {
        sessionStorage.setItem("language", JSON.stringify("cn"));
        sessionStorage.setItem("language_1", "cn");
        this.$i18n.locale = "cn";
      } else {
        this.$i18n.locale = sessionStorage.getItem("language");
      }
    },
  },
  mounted() {
    this.set_language();
  },
};
</script>

<style lang="less">
@import url("./assets/allCss/App.less");
</style>
