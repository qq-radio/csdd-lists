<template>
  <div class="home">
    <el-button class="add" size="mini" @click="click_add">{{ $t("btn.add") }}</el-button>
    <el-form>
      <el-table ref="table" :data="lists[yearValue]">
        <el-table-column class="month" prop="month" :label="$t('month')">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              {{ scope.row.month }}
            </template>
            <template v-else>
              <el-form-item>
                <el-select v-model.number="scope.row.month">
                  <el-option v-for="i in monthArr" :key="i.value" :label="i.label" :value="i.value" :disabled="i.disabled"> </el-option>
                </el-select>
              </el-form-item>
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="afterSalary" :label="$t('afterSalary')">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              {{ scope.row.afterSalary }}
            </template>
            <template v-else>
              <el-form-item>
                <el-input size="mini" v-model.number="scope.row.afterSalary"></el-input>
              </el-form-item>
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="rent" :label="$t('rent')">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              {{ scope.row.rent }}
            </template>
            <template v-else>
              <el-form-item>
                <el-input size="mini" v-model.number="scope.row.rent"></el-input>
              </el-form-item>
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="utilities" :label="$t('utilities')">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              {{ scope.row.utilities }}
            </template>
            <template v-else>
              <el-form-item>
                <el-input size="mini" v-model.number="scope.row.utilities"></el-input>
              </el-form-item>
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="shop" :label="$t('shop')">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              {{ scope.row.shop }}
            </template>
            <template v-else>
              <el-form-item>
                <el-input size="mini" v-model.number="scope.row.shop"></el-input>
              </el-form-item>
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="deposit" :label="$t('deposit')">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              {{ scope.row.deposit }}
            </template>
            <template v-else>
              <el-form-item>
                <el-input size="mini" v-model.number="scope.row.deposit"></el-input>
              </el-form-item>
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="remark" :label="$t('remark')">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              {{ scope.row.remark }}
            </template>
            <template v-else>
              <el-form-item>
                <el-input size="mini" v-model.trim="scope.row.remark"></el-input>
              </el-form-item>
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="action" :label="$t('action')">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              <el-button size="mini" class="edit" @click="click_edit(scope.row, scope.$index)">
                <i class="iconfont icon-17"></i>
              </el-button>
              <el-button size="mini" class="edit" @click="click_delete(scope.row, scope.$index)">
                <i class="iconfont icon-shanchu1"></i>
              </el-button>
            </template>
            <template v-else>
              <el-button class="save" size="mini" @click="click_save(scope.row, scope.$index)">{{ $t("btn.save") }}</el-button>
              <el-button class="save" size="mini" @click="click_cancle(scope.row, scope.$index)">{{ $t("btn.cancle") }}</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { init } from "../datas.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Table",
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
    console.log("this is table page !!");
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
