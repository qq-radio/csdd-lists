<template>
  <div class="table">
    <el-button class="add" size="mini" @click="click_add">{{ $t("btn.add") }}</el-button>
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
        remark: "",
        deposit: "",
        action: "add",
      },
      itemClone: {},
    };
  },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
      year: (state) => state.year,
    }),
    monthArr() {
      let arr = [];
      for (let i = 1; i < 13; i++) {
        arr.push({
          label: i,
          value: i,
        });
      }
      return arr;
    },
  },
  watch: {},
  methods: {
    ...mapMutations(["SET_LISTS"]),

    click_add() {
      if (this.lists[this.year].length >= 12) {
        this.$message({
          message: this.$t("warn"),
          type: "info",
          customClass: "info",
        });
        return;
      }
      this.SET_LISTS({ action: "add", year: this.year, data: JSON.parse(JSON.stringify(this.newItem)) });
    },

    click_edit(item, index) {
      this.itemClone[index] = JSON.parse(JSON.stringify(item));
      item.action = "edit";
      this.SET_LISTS({ action: "edit", year: this.year, index: index, data: JSON.parse(JSON.stringify(item)) });
    },

    click_save(item, index) {
      console.log("item", item);

      switch (item.action) {
        case "add":
          item.year = this.year;
          this.axios
            .post("/api/list/add", item)
            .then((res) => {
              if (res.data.status == 412) {
                this.$message({
                  message: "该月份已存在，不可重复",
                  type: "info",
                  customClass: "info",
                });
                return;
              }
              if (res.data.status == 200) {
                item.action = "view";
                this.SET_LISTS({ action: "save", year: this.year, index: index, data: JSON.parse(JSON.stringify(item)) });
                this.$message({
                  message: "添加成功",
                  type: "info",
                  customClass: "info",
                });
              }
              console.log("save res---", res);
            })
            .catch(function (err) {});
          break;
        case "edit":
          break;
      }
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
        this.SET_LISTS({ action: "cancle_add", year: this.year, index: index });
        return;
      }
      if (this.itemClone[index]) {
        this.itemClone[index].action = "view";
        this.SET_LISTS({ action: "cancle_edit", year: this.year, index: index, data: this.itemClone[index] });
      }
    },

    click_delete(item, index) {
      this.$confirm("确定删除第" + (index + 1) + "数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .post("/api/list/delete", { id: item._id })
            .then((res) => {
              console.log("delete res---", res);
              this.axios
                .post("/api/lists", { year: this.year })
                .then((res) => {
                  console.log("get_datas res -----", res);
                  this.SET_LISTS({ action: "find", year: this.year, datas: res.data });
                })
                .catch(function (err) {});
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
