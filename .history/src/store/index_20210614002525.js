import { createStore } from 'vuex'

export default createStore({
  state: {
    year: '2021年',
    activeTab: "home",
    graphics:"line"
  },
  mutations: {
    CHANGE_YEAR(state, i) {
      state.year = i
      console.log("this.year", state.year);
    },
    // 页签
    SET_ACTIVETAB(state, i) {
      if (!i){
        if (sessionStorage.hasOwnProperty("activeTab") == false) {
          sessionStorage.setItem("activeTab", JSON.stringify(state.activeTab));
        } else {
          state.activeTab = JSON.parse(sessionStorage.getItem("activeTab"));
        }
        console.log('SET_ACTIVETAB ----- 1');
        
      } else {
        state.activeTab = i
        sessionStorage.setItem("activeTab", JSON.stringify(i));
        console.log('SET_ACTIVETAB ----- 2');
      }
      
    },
    // 年
    SET_YEAR(state, i) {
      if (sessionStorage.hasOwnProperty("year") == false) {
        sessionStorage.setItem("year", JSON.stringify(state.year));
      } else {
        state.year = JSON.parse(sessionStorage.getItem("year"));
      }
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
