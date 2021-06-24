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
        <el-select v-model="yearValue" @change="set_year(yearValue)">
          <el-option v-for="i in yearArr" :key="i.value" :label="i.label" :value="i.value"> </el-option>
        </el-select>
      </div>
    </div>
    <el-tabs v-model="activeTab" type="border-card" @tab-click="click_tab">
      <el-tab-pane :label="$t('tab.table')" name="home"> </el-tab-pane>
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
import { init } from "../datas.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      activeTab: "home",
      yearValue: "2021年",
      yearArr: [
        {
          value: "2019年",
          label: "2019年",
        },
        {
          value: "2020年",
          label: "2020年",
        },
        {
          value: "2021年",
          label: "2021年",
        },
      ],
      monthArr: [],
      newItem: {
        month: "",
        afterSalary: "",
        rent: "",
        utilities: "",
        shop: "",
        remark: "",
        deposit: "",
        action: "edit",
      },
      form: "",
      lists: {},
      itemClone: {},
      order: "descending",
    };
  },
  computed: {},
  watch: {
    yearValue(val) {
      this.get_datas();
      this.CHANGE_YEAR(val);
    },
  },
  methods: {
    ...mapMutations(["CHANGE_YEAR", "SET_ACTIVETAB", "SET_YEAR", "SET_GRAPHICS"]),

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

    click_tab(tab, event) {
      switch (Number(tab.index)) {
        case 0:
          this.activeTab = "home";
          this.$router.push("/home");
          sessionStorage.setItem("activeTab", JSON.stringify("home"));
          break;
        case 1:
          this.activeTab = "graphics";
          this.$router.push({ name: "graphics" });
          sessionStorage.setItem("activeTab", JSON.stringify("graphics"));
          break;
        case 2:
          this.activeTab = "more";
          this.$router.push({ name: "more" });
          sessionStorage.setItem("activeTab", JSON.stringify("more"));
          break;
      }
    },

    set_year() {
      sessionStorage.setItem("year", JSON.stringify(this.yearValue));
    },

    set_monthArr() {
      this.monthArr = [];
      let tempArr = [];
      this.lists[this.yearValue].forEach((i) => {
        if (i.month) {
          tempArr.push(Number(i.month));
        }
      });

      for (let i = 1; i < 13; i++) {
        if (tempArr.indexOf(i) !== -1) {
          this.monthArr.push({
            value: i,
            label: i,
            disabled: true,
          });
        } else {
          this.monthArr.push({
            value: i,
            label: i,
            disabled: false,
          });
        }
      }
    },

    get_datas() {
      if (localStorage.hasOwnProperty(this.yearValue) == false) {
        let obj = [
          {
            month: 1,
            afterSalary: "",
            rent: "",
            utilities: "",
            shop: "",
            remark: "test data",
            deposit: "",
            action: "view",
          },
        ];
        localStorage.setItem(this.yearValue, JSON.stringify(obj));
      }
      this.lists[this.yearValue] = JSON.parse(localStorage.getItem(this.yearValue));
      this.set_monthArr();
    },

    click_add() {
      this.lists[this.yearValue].push(JSON.parse(JSON.stringify(this.newItem)));
    },

    click_edit(item, index) {
      this.itemClone[index] = JSON.parse(JSON.stringify(item));
      item.action = "edit";
    },

    click_save(item, index) {
      item.action = "view";
      this.lists[this.yearValue][index] = item;
      localStorage.setItem(this.yearValue, JSON.stringify(this.lists[this.yearValue]));
      this.set_monthArr();
    },

    click_cancle(item, index) {
      function isEmpty() {
        let i = 0;
        for (let key in item) {
          if (!item[key]) {
            i++;
          }
        }
        if (i == 7) {
          return true;
        }
        return false;
      }
      if (isEmpty()) {
        this.lists[this.yearValue].pop();
        return;
      }
      this.lists[this.yearValue][index].action = "view";
      if (this.itemClone[index]) {
        this.itemClone[index].action = "view";
        this.lists[this.yearValue][index] = this.itemClone[index];
        localStorage.setItem(this.yearValue, JSON.stringify(this.lists[this.yearValue]));
      }
    },

    click_delete(item, index) {
      this.$confirm("确定删除第" + (index + 1) + "数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.lists[this.yearValue].splice(index, 1);
          localStorage.setItem(this.yearValue, JSON.stringify(this.lists[this.yearValue]));
          this.set_monthArr();
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    // 存取tab
    if (sessionStorage.hasOwnProperty("activeTab") == false) {
      sessionStorage.setItem("activeTab", JSON.stringify("home"));
    } else {
      this.activeTab = JSON.parse(sessionStorage.getItem("activeTab"));
    }
    // 存取year
    if (sessionStorage.hasOwnProperty("year") == false) {
      sessionStorage.setItem("year", JSON.stringify(this.yearValue));
    } else {
      this.yearValue = JSON.parse(sessionStorage.getItem("year"));
    }
    // 初始化
    if (localStorage.hasOwnProperty("2019年") == false && localStorage.hasOwnProperty("2020年") == false && localStorage.hasOwnProperty("2021年") == false) {
      init().then((res) => {
        if (res) {
          console.log("init successed");
          this.get_datas();
        } else {
          console.error("init failed");
        }
      });
    }
    console.log("this is homeeeeeeeeeeeeee");
    this.get_datas();

    // 获取所有数据，初始化
    // this.axios
    //   .post("/api/lists", { year: "2020" })
    //   .then((res) => {
    //     console.log("res 0000", res);
    //   })
    //   .catch(function (err) {});

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
