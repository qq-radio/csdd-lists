<template>
  <div class="table table_warm">
    <el-button class="add" @click="click_add" type="primary" size="mini">{{ $t("btn.add") }}</el-button>
    <el-form>
      <el-table ref="table" :data="lists[year]">
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
              <el-button @click="click_edit(scope.row, scope.$index)" size="mini">
                <i class="iconfont icon-17"></i>
              </el-button>
              <el-button @click="click_delete(scope.row, scope.$index)" size="mini">
                <i class="iconfont icon-shanchu1"></i>
              </el-button>
            </template>
            <template v-else>
              <el-button @click="click_save(scope.row, scope.$index)" type="primary" size="mini">{{ $t("btn.save") }}</el-button>
              <el-button @click="click_cancle(scope.row, scope.$index)" type="primary" size="mini">{{ $t("btn.cancel") }}</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Table",
  data() {
    return {
      newItem: {
        month: "",
        afterSalary: "",
        rent: "",
        utilities: "",
        shop: "",
        deposit: "",
        remark: "",
        action: "add",
      },
      itemClone: {},
    };
  },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
      year: (state) => state.year,
      monthArr: (state) => state.monthArr,
    }),
  },
  watch: {},
  methods: {
    ...mapMutations(["SET_LISTS"]),
    ...mapActions(["get_datas"]),

    click_add() {
      let arr = this.lists[this.year];
      if (arr.length !== 0) {
        if (arr.length >= 12) {
          this.$message({ message: this.$t("msg.warn"), type: "info" });
          return;
        }
        arr[arr.length - 1].month == 12 || arr[arr.length - 1].month == "" ? (this.newItem.month = "") : (this.newItem.month = Number(arr[arr.length - 1].month) + 1);
      }
      this.SET_LISTS({ action: "add", year: this.year, item: JSON.parse(JSON.stringify(this.newItem)) });
    },

    click_edit(item, index) {
      this.itemClone[item._id] = JSON.parse(JSON.stringify(item));
      item.action = "edit";
      this.SET_LISTS({ action: "edit", year: this.year, index: index, item: item });
    },

    click_save(item, index) {
      if (!item["month"] || !item["afterSalary"]) {
        this.$alert(this.$t("alert.empty"), this.$t("alert.empty_title"), { confirmButtonText: this.$t("btn.sure"), customClass: "infoBox" });
        return;
      }
      switch (item.action) {
        case "add":
          item.year = this.year;
          this.axios
            .post("/api/list/add", item)
            .then((res) => {
              console.log("add res---", res);
              if (res.data.status == 412) {
                this.$message({ message: this.$t("msg.add_failed"), type: "error" });
                return;
              }
              if (res.data.status == 200) {
                item._id = res.data.data._id;
                this.SET_LISTS({ action: "save", year: this.year, index: index, item: item });
                this.$message({ message: this.$t("msg.add_success"), type: "success" });
              }
            })
            .catch(function (err) {});
          break;
        case "edit":
          item.year = this.year;
          this.axios
            .post("/api/list/edit", item)
            .then((res) => {
              console.log("edit res---", res);
              if (res.data.status == 412) {
                this.$message({ message: this.$t("msg.edit_failed"), type: "error" });
                return;
              }
              if (res.data.status == 200) {
                item._id = res.data.data._id;
                this.SET_LISTS({ action: "save", year: this.year, index: index, item: item });
                this.$message({ message: this.$t("msg.edit_success"), type: "success" });
              }
            })
            .catch(function (err) {});
          break;
      }
    },

    click_cancle(item, index) {
      if (item.action == "add") {
        this.SET_LISTS({ action: "cancle_add", year: this.year, index: index });
        return;
      }
      if (this.itemClone[item._id] && item.action == "edit") {
        this.itemClone[item._id].action = "view";
        this.SET_LISTS({ action: "cancle_edit", year: this.year, index: index, item: this.itemClone[item._id] });
      }
    },

    click_delete(item, index) {
      this.$confirm(this.$t("confirm.delete"), this.$t("confirm.delete_title"), { confirmButtonText: this.$t("btn.sure"), cancelButtonText: this.$t("btn.cancel"), cancelButtonClass: "infoBoxCancel", customClass: "infoBox", type: "warning" })
        .then(() => {
          this.axios
            .post("/api/list/delete", { id: item._id })
            .then((res) => {
              this.SET_LISTS({ action: "delete", year: this.year, index: index, item：item });
              this.$message({ message: this.$t("msg.delete_success"), type: "success" });
            })
            .catch(function (err) {});
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    console.log("this is table page !!");
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Table.less");
</style>
