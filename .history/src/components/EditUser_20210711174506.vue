<template>
  <div class="editUser">
    <div class="head">
      <el-button class="back" @click="$router.push({ name: 'home' })">{{ $t("btn.back") }}</el-button>
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
        <el-input v-model="form_1.password"></el-input>
      </el-form-item>
      <el-form-item class="login">
        <el-button @click="click_step_1" type="primary">{{ $t("btn.next_step") }}</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="activeStep == '2'" :model="form_2" ref="refForm_2" :rules="rules_2">
      <el-form-item :label="$t('editUser.new_password')" prop="new_password" label-width="160px">
        <el-input v-model="form_2.new_password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('editUser.new_password_again')" prop="new_password_again" label-width="160px">
        <el-input v-model="form_2.new_password_again"></el-input>
      </el-form-item>
      <el-form-item class="login">
        <el-button @click="click_step_2" type="primary">{{ $t("btn.next_step") }}</el-button>
      </el-form-item>
    </el-form>
    <div v-if="activeStep == '3'" class="sure">
      <p>{{ $t("editUser.completed_info") }}</p>
      <el-button @click="$router.push({ name: 'home' })">{{ $t("btn.sure") }}</el-button>
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
        username: "11",
        password: "11",
      },
      form_2: {
        new_password: "22",
        new_password_again: "22",
      },
      rules_1: {},
      rules_2: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    click_step_1() {
      this.activeStep = 2;
      console.log("form_1", this.form_1);
    },
    click_step_2() {
      this.activeStep = 3;
      console.log("form_2", this.form_2);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
@color: rgb(135, 137, 138);
@bgColor: rgb(223, 236, 242);

.editUser {
  .head {
    background-color: @bgColor;
    width: 100%;
    height: 52px;
    .back {
      min-height: 32px;
      color: @color;
      padding: 4px 16px;
      margin: 10px 0 0 10px;
      border-color: fade(@color, 40%);
      &:hover {
        font-weight: 700;
        border-color: fade(@color, 40%);
      }
    }
  }
  .el-steps {
    width: 60%;
    margin: 80px auto;
  }
  .el-form {
    width: 30%;
    margin: 20px auto;
    .el-form-item:nth-child(3) {
      text-align: right;
    }
  }
  .sure {
    width: 30%;
    margin: 20px auto;
    text-align: center;
  }
}
</style>
