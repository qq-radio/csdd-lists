import { createStore } from 'vuex'
const axios = require('axios')

export default createStore({
  state: {
    lists: {},
    year: ""
  },
  mutations: {
    SET_LISTS(state, i) {
      if (i.action == "find") {
        state.year = i.year
        state.lists[i.year] = i.datas
      }
      if (i.action == "add") {
        state.lists[i.year].push(JSON.parse(JSON.stringify(i.data)));
      }
      if (i.action == "edit") {
        state.lists[i.year][i.index] = i.data
      }
      if (i.action == "cancle_add") {
        state.lists[i.year].splice(i.index, 1)
      }
      if (i.action == "cancle_edit") {
        state.lists[i.year][i.index] = i.data
      }

    }
  },
  actions: {
    get_datas({ state, commit }, payload) {
      return axios
        .post("/api/lists", { year: payload.year  })
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
