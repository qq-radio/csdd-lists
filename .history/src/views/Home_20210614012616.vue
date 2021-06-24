<template>
  <div class="home">
    <div class="head">
      <div class="left">
        <el-dropdown>
          <span class="iconfont icon-yonghuming1"></span>
          <template #dropdown>
            <el-dropdown-menu class="user">
              <el-dropdown-item>{{ $t("changePwd") }}</el-dropdown-item>
              <el-dropdown-item>{{ $t("quit") }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span class="iconfont icon-zhongwen" @click="change_language" v-if="$i18n.locale == 'cn'"></span>
        <span class="iconfont icon-yingwen" @click="change_language" v-if="$i18n.locale == 'en'"></span>
        <el-dropdown>
          <span class="iconfont icon-theme-palette-fill"></span>
          <template #dropdown>
            <el-dropdown-menu class="theme">
              <el-dropdown-item class="one">Bright</el-dropdown-item>
              <el-dropdown-item class="two">Warm</el-dropdown-item>
              <el-dropdown-item class="three">Dark</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span class="iconfont icon-shezhi"></span>
      </div>
      <div class="right">
        <span>Personal Consumption List Platform 个人消费清单平台</span>
        <el-select v-model="year" @change="set_year">
          <el-option v-for="i in yearArr" :key="i.value" :label="i.label" :value="i.value"> </el-option>
        </el-select>
      </div>
    </div>
    <el-tabs v-model="activeTab" type="border-card" @tab-click="click_tab">
      <el-tab-pane :label="$t('tab.table')" name="table">
        <router-view name="table" />
      </el-tab-pane>
      <el-tab-pane :label="$t('tab.graphics')" name="graphics">
        <router-view name="graphics" />
      </el-tab-pane>
      <el-tab-pane :label="$t('tab.more')" name="more">
        <router-view name="more" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      year: "2020",
      yearArr: [
        {
          value: "2019",
          label: "2019年",
        },
        {
          value: "2020",
          label: "2020年",
        },
        {
          value: "2021",
          label: "2021年",
        },
      ],
      activeTab: "table",
    };
  },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
    }),
  },
  watch: {},
  methods: {
    ...mapMutations(["SET_LISTS"]),
    change_language() {
      let locales = ["cn", "en"];
      this.$i18n.locale = locales[2 - (Number(locales.indexOf(this.$i18n.locale)) + 1)];
      switch (this.$i18n.locale) {
        case "cn":
          this.$message({
            message: "已切换至中文模式 !",
            type: "info",
            customClass: "info",
          });
          break;
        case "en":
          this.$message({
            message: "change language to English successfully !",
            type: "info",
            customClass: "info",
          });
          break;
      }
    },

    set_activeTab(i) {
      // 首次加载
      if (!i) {
        if (sessionStorage.hasOwnProperty("activeTab") == false) {
          sessionStorage.setItem("activeTab", JSON.stringify(i));
        } else {
          this.activeTab = JSON.parse(sessionStorage.getItem("activeTab"));
        }
      } else {
        // 点击tab
        this.activeTab = tab.props.name;
        sessionStorage.setItem("activeTab", JSON.stringify(i));
      }

      this.$router.push(this.activeTab);
    },

    click_tab(tab, event) {
      console.log("tab", tab.props.name);

      switch (Number(tab.index)) {
        case 0:
          this.$router.push("table");
          this.set_activeTab("table");
          break;
        case 1:
          this.$router.push({ name: "graphics" });
          this.set_activeTab("graphics");
          break;
        case 2:
          this.$router.push({ name: "more" });
          this.set_activeTab("more");
          break;
      }
    },

    set_year(i) {
      if (!i) {
        if (sessionStorage.hasOwnProperty("year") == false) {
          sessionStorage.setItem("year", JSON.stringify(this.year));
        } else {
          this.year = JSON.parse(sessionStorage.getItem("year"));
        }
        console.log("set_year ----- 1");
      } else {
        this.year = i;
        sessionStorage.setItem("year", JSON.stringify(this.year));
        this.get_datas();
        console.log("set_year ----- 2");
      }
    },

    get_datas() {
      this.axios
        .post("/api/lists", { year: this.year })
        .then((res) => {
          console.log("get_datas res -----", res);
          this.SET_LISTS({ year: this.year, datas: res.data });
        })
        .catch(function (err) {});
    },
  },
  created() {},
  mounted() {
    console.log("this is home page !!");
    this.set_activeTab();
    this.set_year();
    this.get_datas();

    // edit、add操作都是/list/save
    // let temp = {
    //   year: "2020",
    //   month: "888",
    //   afterSalary: 111111111,
    //   rent: "",
    //   utilities: "",
    //   shop: "",
    //   remark: "",
    //   deposit: "",
    //   action: "view",
    // };
    // this.axios
    //   .post("/api/list/save", temp)
    //   .then((res) => {
    //     console.log("res save ---", res);
    //   })
    //   .catch(function (err) {});

    // delete
    // let id = "60c5f53d3a0cd83b443ee5e9";
    // this.axios
    //   .post("/api/list/delete", { id: id })
    //   .then((res) => {
    //     console.log("res delete ---", res);
    //   })
    //   .catch(function (err) {});
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Home.less");
</style>
