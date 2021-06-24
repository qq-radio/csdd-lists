<template>
  <div class="wrapper">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="test_1">
        <router-view name="test_1" />
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="test_2">
        <router-view name="test_2" />
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="test_3">
        <router-view name="test_3" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({ name: this.activeName });
    },
  },
  mounted() {
    console.log("---------------------- this is test ------------------------");
  },
};
</script>

<style></style>
