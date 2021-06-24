import { createStore } from 'vuex'
const axios = require('axios')

export default createStore({
  state: {
    lists: {},
    year: ""
  },
  mutations: {
    CHANGE_YEAR(state, i) {
      state.year = i
      console.log("this.year", state.year);
    },
    // 图
    SET_GRAPHICS(state, i) {
      if (sessionStorage.hasOwnProperty("graphics") == false) {
        sessionStorage.setItem("graphics", JSON.stringify("line"));
      } else {
        state.graphics = JSON.parse(sessionStorage.getItem("graphics"));
      }
    },
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
      if (i.action == "save") {
        state.lists[i.year][i.index] = i.data
      }
      if (i.action == "cancle_1") {
        state.lists[i.year].splice(index,index+1)
      }
      
    }
  },
  actions: {
  },
  modules: {
  }
})
