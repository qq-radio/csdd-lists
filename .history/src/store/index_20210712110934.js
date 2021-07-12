import { createStore } from 'vuex'
const axios = require('axios')

export default createStore({
  state: {
    lists: {},
    year: "",
    openStatus:{}
  },
  mutations: {
    SET_LISTS(state, payload) {
      if (payload.action == "init") {
        state.year = payload.year
        // state.lists[payload.year] = payload.datas
      }
      if (payload.action == "add") {
        state.lists[payload.year].push(payload.item);
        state.openStatus[state.lists[payload.year].length-1] = true;
      }
      if (payload.action == "edit") {
        state.lists[payload.year][payload.index].action = payload.item.action
        state.openStatus[payload.index] = true;
      }
      if (payload.action == 'save') {
        payload.item.action = 'view'
        state.lists[payload.year].splice(payload.index, 1);
        state.openStatus[payload.index] = false;
        if (payload.item.month > state.lists[payload.year][state.lists[payload.year].length-1].month) {
          state.lists[payload.year].push(payload.item);
        } else {
          for (let i = 0; i < state.lists[payload.year].length; i++) {
            if (payload.item.month < state.lists[payload.year][i].month) {
              state.lists[payload.year].splice(i, 0, payload.item);
              return
            }
          }
        }
      }
      if (payload.action == "cancle_add") {
        state.lists[payload.year].splice(payload.index, 1)
        state.openStatus[payload.index] = false;
      }
      if (payload.action == "cancle_edit") {
        state.lists[payload.year][payload.index] = payload.item
        state.openStatus[payload.index] = false;
      }
      if (payload.action == "delete") {
        state.lists[payload.year].splice(payload.index, 1)
      }
    }
  },
  actions: {
    get_datas({ state, commit }, payload) {
      console.log('get_datas payload ---', payload);
      return axios
        .post("/api/lists", { year: payload.year })
        .then((res) => {
          console.log("get_datas res -----", res);
          commit('SET_LISTS', { action: 'init', year: payload.year, datas: res.data });
        })
        .catch(function (err) { });
    },
  },
  modules: {
  }
})
