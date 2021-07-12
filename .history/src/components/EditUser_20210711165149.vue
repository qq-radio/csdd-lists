<template>
  <div class="editUser">
    <div class="head">
      <el-button class="back" @click="click_back">返 回</el-button>
    </div>
    <el-steps :active="activeStep">
      <el-step :title="$t('editUser.step_1_title')" :description="$t('editUser.step_1_desc')"></el-step>
      <el-step :title="$t('editUser.step_2_title')" :description="$t('editUser.step_2_desc')"></el-step>
      <el-step :title="$t('editUser.step_3_title')" :description="$t('editUser.step_3_desc')"></el-step>
    </el-steps>
    <el-form v-if="activeStep == '1'" :model="form_1" ref="refForm_1" :rules="rules_1" class="demo-form-inline">
      <el-form-item :label="$t('editUser.username')" prop="userame" label-width="80px">
        <el-input v-model="form_1.userame"></el-input>
      </el-form-item>
      <el-form-item :label="$t('editUser.password')" prop="password" label-width="80px">
        <el-input v-model="form_1.password"></el-input>
      </el-form-item>
      <el-form-item class="login">
        <el-button @click="click_step_1" type="primary">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="activeStep == '2'" :model="form_2" ref="refForm_2" :rules="rules_2" class="demo-form-inline">
      <el-form-item :label="$t('editUser.new_password')" prop="new_password" label-width="80px">
        <el-input v-model="form_2.userame"></el-input>
      </el-form-item>
      <el-form-item :label="$t('editUser.new_password_again')" prop="new_password_again" label-width="80px">
        <el-input v-model="form_2.password"></el-input>
      </el-form-item>
      <el-form-item class="login">
        <el-button @click="click_step_2" type="primary">下一步</el-button>
      </el-form-item>
    </el-form>
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
        username: "test_01",
        password: "11",
      },
      form_2: {
        new_username: "test_01",
        new_username_again: "11",
      },
      rules_1: {},
      rules_2: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    click_back() {
      this.$router.push({ name: "home" });
    },
    click_step_1() {
      this.activeStep = 2;
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
    margin: 20px auto;
  }
}
</style>
