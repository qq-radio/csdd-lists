import { createStore } from 'vuex'

export default createStore({
  state: {
    year: '2021年',
    activeTab: "home",
    graphics: "line"
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
    }

  },
  actions: {

  },
  modules: {
  }
})
