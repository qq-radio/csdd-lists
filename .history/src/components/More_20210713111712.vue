<template>
  <div class="about">
    <div class="one">
      <img src="../../public/about.jpg" alt="about.jpg" />
      <div class="contact">
        <a href="https://github.com/csdd-21" target="_blank"><i class="iconfont icon-github"></i></a>
        <a href="https://github.com/csdd-21/csdd-blog" target="_blank"><i class="iconfont icon-blog"></i></a>
      </div>
    </div>
    <div class="two">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="INTRODUCTION" name="1">
          <div class="txt" v-html="postAbout"></div>
        </el-collapse-item>
        <el-collapse-item title="OTHER" name="2">
          <div class="txt" v-html="postOther"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
export default {
  components: {
    name: "More",
  },
  data() {
    return {
      activeNames: ["2"],
      postAbout: "",
      postOther: "",
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
  mounted() {
    this.axios
      .get("/about/about.md")
      .then((res) => {
        this.postAbout = new MarkdownIt({ html: true }).render(res.data);
      })
      .catch(function (err) {});
    this.axios
      .get("/about/other.md")
      .then((res) => {
        this.postOther = new MarkdownIt({ html: true }).render(res.data);
      })
      .catch(function (err) {})
      .then(function () {});
  },
};
</script>

<style lang="less">
@import url("../assets/allCss/About.less");
</style>
