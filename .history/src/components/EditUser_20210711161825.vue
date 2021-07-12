<template>
  <div class="editUser">
    <div class="head">
      <el-button class="back" @click="click_back">返 回</el-button>
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
      color: @color;
      padding: 2px 10px;
      margin-top: 6px;
    }
  }
}
</style>
