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
export default {
  name: "EditUser",
  components: {},
  props: {},
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
  watch: {},
  computed: {},
  methods: {
    click_step_1() {
      this.$refs["refForm_1"].validate((valid) => {
        if (valid) {
          this.axios({ method: "post", url: "/api/login", data: this.form_1 })
            .then((res) => {
              if (res.data.status !== 200) {
                this.$alert(this.$t("alert.auth_failed"), this.$t("alert.auth_failed_title"), { confirmButtonText: "确定", customClass: "infoBox" });
                return;
              }
              this.$message({ message: $t("msg.auth_success"), type: "success" });
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
                this.$message({ message: $t("msg.set_success"), type: "success" });
                this.activeStep = 3;
                setTimeout(() => {
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
};
</script>

<style lang="less" scoped>
@color: rgb(135, 137, 138);
@bgColor: rgb(223, 236, 242);
@stepFinishColor: rgb(55, 132, 165);

.editUser {
  .head {
    background-color: @bgColor;
    width: 100%;
    height: 52px;
    .el-button {
      background-color: rgb(255, 255, 255);
      margin: 6px 0 0 20px;
    }
  }
  .el-steps {
    width: 60%;
    margin: 80px auto;
    /deep/ .el-step__head.is-finish {
      color: @stepFinishColor;
      border-color: @stepFinishColor;
    }
    /deep/ .el-step__title.is-finish {
      color: @stepFinishColor;
    }
    /deep/ .el-step__description.is-finish {
      color: @stepFinishColor;
    }
  }
  .el-form {
    width: 30%;
    margin: 20px auto;
    .el-form-item:nth-child(3) {
      text-align: right;
    }
  }
  .sure {
    color: @color;
    width: 30%;
    margin: 20px auto;
    text-align: center;
  }
}
</style>
