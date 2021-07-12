<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="60px">
      <el-form-item :label="$t('form.username')" prop="username">
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('form.password')" prop="password">
        <el-input type="text" v-model="form.password" show-password></el-input>
      </el-form-item>
      <div class="btns">
        <el-button @click="click_register">{{ $t("btn.register") }}</el-button>
        <el-button @click="click_login">{{ $t("btn.login") }}</el-button>
      </div>
    </el-form>
    <Swiper>
      <SwiperSlide>
        <img src="../assets/bgImg.jpg" alt="bgImg" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      swiper: {
        pagination: {
          clickable: true,
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
      },
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    click_register() {
      this.axios({ method: "post", url: "/api/register", data: JSON.parse(JSON.stringify(this.form)) })
        .then((res) => {
          if (res.data.status == 403) {
            this.$alert(this.$t("alert.register_failed_exist"), this.$t("alert.register_failed_title"), { confirmButtonText: "确定", customClass: "infoBox" });
          }
          if (res.data.status == 200) {
            this.$alert(this.$t("alert.register_success"), this.$t("alert.register_success_title"), {
              confirmButtonText: "确定",
              customClass: "infoBox",
              callback: () => {
                this.$router.push({ name: "home" });
                sessionStorage.setItem("authorization", res.data.data.token);
              },
            });
          }
        })
        .catch((err) => {});
    },
    click_login() {
      this.axios({ method: "post", url: "/api/login", data: JSON.parse(JSON.stringify(this.form)) })
        .then((res) => {
          if (res.data.status == 416) {
            this.$alert(this.$t("alert.login_failed_unRegister"), this.$t("alert.login_failed_title"), { confirmButtonText: "确定", customClass: "infoBox" });
          }
          if (res.data.status == 401) {
            this.$alert(this.$t("alert.login_failed_wrongPassword"), this.$t("alert.login_failed_title"), { confirmButtonText: "确定", customClass: "infoBox" });
          }
          if (res.data.status == 200) {
            this.$router.push({ name: "home" });
            this.$message({ message: this.$t("msg.login_success"), type: "info", customClass: "info" });
            sessionStorage.setItem("authorization", res.data.data.token);
          }
        })
        .catch((err) => {});
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Login.less");
</style>
