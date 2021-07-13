<template>
  <div class="editUser">
    <div class="head">
      <el-button @click="$router.push({ name: 'home' })" size="medium">{{ $t("btn.back") }}</el-button>
    </div>
    <el-steps :active="activeStep">
      <el-step :title="$t('editUser.step_1_title')" :description="$t('editUser.step_1_desc')"></el-step>
      <el-step :title="$t('editUser.step_2_title')" :description="$t('editUser.step_2_desc')"></el-step>
      <el-step :title="$t('editUser.step_3_title')" :description="$t('editUser.step_3_desc')"></el-step>
    </el-steps>
    <el-form v-if="activeStep == '1'" :model="form_1" ref="refForm_1" :rules="rules_1" label-position="left">
      <el-form-item :label="$t('editUser.username')" prop="username" label-width="80px">
        <el-input v-model="form_1.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('editUser.password')" prop="password" label-width="80px">
        <el-input v-model="form_1.password" show-password></el-input>
      </el-form-item>
      <el-form-item class="login">
        <el-button @click="click_step_1" type="primary" size="medium">{{ $t("btn.next_step") }}</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="activeStep == '2'" :model="form_2" ref="refForm_2" :rules="rules_2" label-position="left">
      <el-form-item :label="$t('editUser.new_password')" prop="new_password" label-width="160px">
        <el-input v-model="form_2.new_password" show-password></el-input>
      </el-form-item>
      <el-form-item :label="$t('editUser.new_password_again')" prop="new_password_again" label-width="160px">
        <el-input v-model="form_2.new_password_again" show-password></el-input>
      </el-form-item>
      <el-form-item class="login">
        <el-button @click="click_step_2" type="primary" size="medium">{{ $t("btn.next_step") }}</el-button>
      </el-form-item>
    </el-form>
    <div v-if="activeStep == '3'" class="sure">
      <p>{{ $t("editUser.completed_info") }}</p>
      <el-button @click="$router.push({ name: 'home' })" type="primary" size="medium">{{ $t("btn.ensure") }}</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
const timeId = "";
export default {
  name: "EditUser",
  data() {
    return {
      activeStep: 1,
      form_1: {
        username: "",
        password: "",
      },
      form_2: {
        new_password: "",
        new_password_again: "",
      },
      rules_1: { username: [{ required: true, message: this.$t("rules.username"), trigger: "blur" }], password: [{ required: true, message: this.$t("rules.password"), trigger: "blur" }] },
      rules_2: { new_password: [{ required: true, message: this.$t("rules.new_password"), trigger: "blur" }], new_password_again: [{ required: true, message: this.$t("rules.new_password_again"), trigger: "blur" }] },
    };
  },
  methods: {
    click_step_1() {
      this.$refs["refForm_1"].validate((valid) => {
        if (valid) {
          this.axios({ method: "post", url: "/api/login", data: this.form_1 })
            .then((res) => {
              if (res.data.status !== 200) {
                this.$alert(this.$t("alert.auth_failed"), this.$t("alert.auth_failed_title"), { confirmButtonText: this.$t("btn.sure"), customClass: "infoBox" });
                return;
              }
              this.$message({ message: this.$t("msg.auth_success"), type: "success" });
              this.activeStep = 2;
              this.form_1._id = res.data.data._id;
            })
            .catch((err) => {});
        }
      });
    },
    click_step_2() {
      this.$refs["refForm_2"].validate((valid) => {
        if (valid) {
          this.axios({ method: "post", url: "/api/editUser", data: { _id: this.form_1._id, username: this.form_1.username, new_password: this.form_2.new_password } })
            .then((res) => {
              if (res.data.status == 200) {
                this.$message({ message: this.$t("msg.set_success"), type: "success" });
                this.activeStep = 3;
                this.timeId = setTimeout(() => {
                  this.$router.push({ name: "home" });
                }, 3000);
              }
            })
            .catch((err) => {});
        }
      });
    },
  },
  created() {},
  mounted() {},
  unmounted() {
    clearTimeout(this.timeId);
  },
};
</script>

<style lang="less" scoped></style>
