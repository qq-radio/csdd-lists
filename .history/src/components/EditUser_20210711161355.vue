<template>
  <div class="editUser">
    <div class="head">
      <el-button class="back">返 回</el-button>
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
  methods: {},
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
      line-height: 52px;
    }
  }
}
</style>
