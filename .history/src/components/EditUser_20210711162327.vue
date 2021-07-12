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
      min-height: 32px;
      color: @color;
      padding: 4px 16px;
      margin: 10px 0 0 10px;
      border-color: fade(@color, 40%);
      &:hover {
        background-color: fade(@bgColor, 80%);
        font-weight: 700;
        border-color: fade(@color, 40%);
      }
    }
  }
}
</style>
