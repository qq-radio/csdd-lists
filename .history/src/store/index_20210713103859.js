import { createStore } from 'vuex'
const axios = require('axios')

// 过滤月份下拉框
function get_monthArr(datas) {
  let arr = []
  let tempArr = [];
  datas.forEach(i => {
    if (i.month) {
      tempArr.push(Number(i.month));
    }
  })
  for (let i = 1; i < 13; i++) {
    if (tempArr.indexOf(i) !== -1) {
      arr.push({
        value: i,
        label: i,
        disabled: true,
      });
    } else {
      arr.push({
        value: i,
        label: i,
        disabled: false,
      });
    }
  }
  return arr
}

export default createStore({
  state: {
    year: "",
    lists: {},
    monthArr: [],
  },
  mutations: {
    SET_MONTH_DISABLE(state, payload) {
      for (let i = 0; i < state.monthArr.length; i++) {
        if (state.monthArr[i].value == payload.month) {
          state.monthArr[i].disabled = payload.disabled;
          break;
        }
      }
    },

    SET_LISTS(state, payload) {
      if (payload.action == "init") {
        state.year = payload.year
        state.lists[payload.year] = payload.datas
        state.monthArr = get_monthArr(payload.datas)
      }
      if (payload.action == "add") {
        state.lists[payload.year].push(payload.item);
      }
      if (payload.action == "edit") {
        state.lists[payload.year][payload.index].action = payload.item.action
        // SET_MONTH_DISABLE({ month: payload.item.month, disabled: false })
        this.commit('SET_MONTH_DISABLE', { month: payload.item.month, disabled: false });
        // for (let i = 0; i < state.monthArr.length; i++) {
        //   if (state.monthArr[i].value == payload.item.month) {
        //     state.monthArr[i].disabled = false;
        //     break;
        //   }
        // }
      }
      if (payload.action == 'save') {
        payload.item.action = 'view'
        state.lists[payload.year].splice(payload.index, 1);
        let length = state.lists[payload.year].length
        if (length == 0 || payload.item.month > state.lists[payload.year][length - 1].month) {
          state.lists[payload.year].push(payload.item);
        } else {
          for (let i = 0; i < length; i++) {
            if (payload.item.month < state.lists[payload.year][i].month) {
              state.lists[payload.year].splice(i, 0, payload.item);
              break;
            }
          }
        }
        // commit('SET_MONTH_DISABLE', { month: item.month, disabled: true });
        // for (let i = 0; i < state.monthArr.length; i++) {
        //   if (state.monthArr[i].value == payload.item.month) {
        //     state.monthArr[i].disabled = true;
        //     break;
        //   }
        // }
      }
      if (payload.action == "cancle_add") {
        state.lists[payload.year].splice(payload.index, 1)
      }
      if (payload.action == "cancle_edit") {
        state.lists[payload.year][payload.index] = payload.item
        // commit('SET_MONTH_DISABLE', { month: item.month, disabled: true });
        // for (let i = 0; i < state.monthArr.length; i++) {
        //   if (state.monthArr[i].value == payload.item.month) {
        //     state.monthArr[i].disabled = true;
        //     break;
        //   }
        // }
      }
      if (payload.action == "delete") {
        state.lists[payload.year].splice(payload.index, 1)
        // commit('SET_MONTH_DISABLE', { month: item.month, disabled: false });
        // for (let i = 0; i < state.monthArr.length; i++) {
        //   if (state.monthArr[i].value == payload.month) {
        //     state.monthArr[i].disabled = false;
        //     break;
        //   }
        // }
      }
    }
  },
  actions: {
    get_datas({ state, commit }, payload) {
      return axios
        .post("/api/lists", { year: payload.year })
        .then((res) => {
          commit('SET_LISTS', { action: 'init', year: payload.year, datas: res.data });
        })
        .catch();
    },
  },
  modules: {
  }
})
