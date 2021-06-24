import { createStore } from 'vuex'

export default createStore({
  state: {
    lists: {},
    year:""
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
        state.lists[i.year] = i.datas  
    }
  },
  actions: {
    set_lists({ state, commit }, payload) {

    },
  },
  modules: {
  }
})
