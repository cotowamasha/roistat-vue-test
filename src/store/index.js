import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storageKey = "users";

const store = new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    UPLOAD_STORAGE_USERS(state) {
      const items = localStorage.getItem(storageKey);
      state.users = items ? JSON.parse(items) : [];
    },
    CREATE_USER(state, { name, phone, parent_phone }) {
      const newUser = {
        name,
        phone,
        parent_phone,
        children: []
      };

      let isFindParent;
      if (parent_phone)
        isFindParent = state.users.find(
          element => element.phone === parent_phone
        );
      if (isFindParent) isFindParent.children.push({ name, phone });

      state.users.push({
        ...newUser,
        ...{ order: isFindParent ? isFindParent.order + 1 : 1 }
      });

      localStorage.setItem(storageKey, JSON.stringify(state.users));
    },
    CLEAR_STORAGE(state) {
      localStorage.clear();
      state.users = [];
    }
  }
});

export default store;
