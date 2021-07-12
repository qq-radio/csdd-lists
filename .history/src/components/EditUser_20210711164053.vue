<template>
  <div class="editUser">
    <div class="head">
      <el-button class="back" @click="click_back">返 回</el-button>
    </div>
    <el-steps :active="1">
      <el-step :title="$t('editUser.step_1_title')" :description="$t('editUser.step_1_desc')"></el-step>
      <el-step :title="$t('editUser.step_2_title')" :description="$t('editUser.step_2_desc')"></el-step>
      <el-step :title="$t('editUser.step_3_title')" :description="$t('editUser.step_3_desc')"></el-step>
    </el-steps>
    <el-form :model="form" ref="refForm" :rules="rules" class="demo-form-inline">
      <el-form-item label="用户名" prop="userame" label-width="80px">
        <el-input v-model="form.userame"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="password" label-width="80wpx">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item class="login">
        <el-button @click="click_login" type="primary" size="mini">确 认</el-button>
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
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    click_back() {
      this.$router.push({ name: "home" });
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
