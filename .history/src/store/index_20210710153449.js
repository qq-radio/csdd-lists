import { createStore } from 'vuex'
const axios = require('axios')

export default createStore({
  state: {
    lists: {},
    year: ""
  },
  mutations: {
    SET_LISTS(state, payload) {
      if (payload.action == "find") {
        state.year = payload.year
        state.lists[payload.year] = payload.datas
      }
      if (payload.action == "add") {
        state.lists[payload.year].push(payload.item);
      }
      if (payload.action == "edit") {
        state.lists[payload.year][payload.index] = payload.item
      }
      if (payload.action == 'save') {
        console.log('save payload',payload);
        state.lists.splice(payload.index, 1);
        state.lists[payload.year].forEach(i => {
          if(payload.item.month > i.month) {
            state.lists.splice(payload.index, 0, item);
          }
        })
      }
      if (payload.action == "cancle_add") {
        state.lists[payload.year].splice(payload.index, 1)
      }
      if (payload.action == "cancle_edit") {
        state.lists[payload.year][payload.index] = payload.item
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
          commit('SET_LISTS', { action: 'find', year: payload.year, datas: res.data });
        })
        .catch(function (err) { });
    },
  },
  modules: {
  }
})
