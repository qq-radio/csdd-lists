<template>
  <div class="home">
    <div class="head">
      <div class="left">
        <el-dropdown>
          <span class="iconfont icon-yonghuming1"></span>
          <template #dropdown>
            <el-dropdown-menu class="user">
              <el-dropdown-item @click="$router.push({ name: 'editUser' })">{{ $t("changePwd") }}</el-dropdown-item>
              <el-dropdown-item @click="$router.push({ name: 'login' })">{{ $t("quit") }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-tooltip v-if="$i18n.locale == 'cn'" class="item" effect="dark" content="change language" placement="bottom">
          <span v-if="$i18n.locale == 'cn'" class="iconfont icon-zhongwen" @click="change_language"></span>
        </el-tooltip>
        <el-tooltip v-if="$i18n.locale == 'en'" class="item" effect="dark" content="change language" placement="bottom">
          <span v-if="$i18n.locale == 'en'" class="iconfont icon-yingwen" @click="change_language"></span>
        </el-tooltip>
        <el-dropdown>
          <span class="iconfont icon-theme-palette-fill"></span>
          <template #dropdown>
            <el-dropdown-menu class="theme">
              <el-dropdown-item class="one">Bright</el-dropdown-item>
              <el-dropdown-item class="two">Warm</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-tooltip class="item" effect="dark" content="goto github to see source code" placement="bottom">
          <a href="https://github.com/csdd-21" target="_blank"><i class="iconfont icon-github"></i></a>
        </el-tooltip>
      </div>
      <div class="right">
        <span>Personal Consumption List Platform 个人消费清单平台</span>
        <el-select v-model="year" @change="set_year">
          <el-option v-for="i in yearArr" :key="i.value" :label="i.label" :value="i.value"> </el-option>
        </el-select>
        {{ $t("year") }}
      </div>
    </div>
    <el-tabs v-model="activeTab" type="border-card" @tab-click="set_activeTab" :before-leave="handle_beforeLeave">
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
      year: "2021",
      yearArr: [
        {
          value: "2019",
          label: "2019",
        },
        {
          value: "2020",
          label: "2020",
        },
        {
          value: "2021",
          label: "2021",
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
    ...mapActions(["get_datas"]),
    change_language() {
      let locales = ["cn", "en"];
      this.$i18n.locale = locales[2 - (Number(locales.indexOf(this.$i18n.locale)) + 1)];
      sessionStorage.setItem("language", JSON.stringify(this.$i18n.locale));
      switch (this.$i18n.locale) {
        case "cn":
          this.$message({ message: "已切换至中文模式", type: "info", customClass: "info" });
          break;
        case "en":
          this.$message({ message: "change language to English successfully", type: "info", customClass: "info" });
          break;
      }
    },

    set_activeTab(i) {
      // 首次加载
      if (!i) {
        if (sessionStorage.hasOwnProperty("activeTab") == false) {
          sessionStorage.setItem("activeTab", JSON.stringify(this.activeTab));
        } else {
          this.activeTab = JSON.parse(sessionStorage.getItem("activeTab"));
        }
        this.$router.push({ name: this.activeTab });
      } else {
        // 点击tab
        // this.activeTab = i.props.name;
        // this.$router.push({ name: this.activeTab });
        // sessionStorage.setItem("activeTab", JSON.stringify(this.activeTab));
      }
    },

    handle_beforeLeave(tab) {
      let arr = this.lists[this.year];
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].action == "add" || arr[i].action == "edit") {
            this.$confirm(this.$t("confirm.save"), this.$t("confirm.save_title"), { confirmButtonText: this.$t("btn.save"), cancelButtonText: this.$t("btn.cancel_save"), customClass: "infoBox" })
              .then(() => {
                console.log("save");
              })
              .catch(() => {
                console.log("cancel");
              });
          }
        }
      }

      // 直接跳
      this.$router.push({ name: tab });
      sessionStorage.setItem("activeTab", JSON.stringify(tab));
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
        console.log("set_year ----- 2");
      }
      this.get_datas({ year: this.year });
    },
  },
  created() {},
  mounted() {
    console.log("this is home page !!");
    this.set_year();
    this.set_activeTab();
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Home.less");
</style>
