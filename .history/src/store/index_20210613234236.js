import { createStore } from 'vuex'

export default createStore({
  state: {
    year: '2021年'
  },
  mutations: {
    CHANGE_YEAR(state, i) {
      state.year = i
      console.log("this.year", state.year);
    },
    SET_YEAR(state, i) {
      if (sessionStorage.hasOwnProperty("year") == false) {
        sessionStorage.setItem("year", JSON.stringify(this.yearValue));
      } else {
        state.year = JSON.parse(sessionStorage.getItem("year"));
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
