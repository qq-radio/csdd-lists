<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="60px">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="text" v-model="form.password" show-password></el-input>
      </el-form-item>
      <div class="btns">
        <el-button @click="click_register">注册</el-button>
        <el-button @click="click_login">登录</el-button>
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
  components: {},
  props: {},
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
  watch: {},
  computed: {},
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
              callback: (action) => {
                this.$router.push({ name: "home" });
                sessionStorage.setItem("authorization", res.data.data.token);
              },
            });
          }
          console.log("register res ---", res);
        })
        .catch((err) => {
          console.log("register err ---", err);
        });
    },
    click_login() {
      this.axios({
        method: "post",
        url: "/api/login",
        data: JSON.parse(JSON.stringify(this.form)),
      })
        .then((res) => {
          if (res.data.status == 416) {
            this.$alert(this.$t("alert.login_failed_unRegister"), this.$t("alert.login_failed_title"), {
              confirmButtonText: "确定",
              customClass: "infoBox",
            });
          }
          if (res.data.status == 401) {
            this.$alert(this.$t("alert.login_failed_wrongPassword"), this.$t("alert.login_failed_title"), {
              confirmButtonText: "确定",
              customClass: "infoBox",
            });
          }
          if (res.data.status == 200) {
            this.$router.push({ name: "home" });
            this.$message({ message: this.$t("msg.login_success"), type: "info", customClass: "info" });
            sessionStorage.setItem("authorization", res.data.data.token);
          }
          console.log("login res -", res);
        })
        .catch((err) => {
          console.log("login err ---", err);
        });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Login.less");
</style>
