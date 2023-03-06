<template>
  <div id="app">
    <div class="wrapper">
      <div class="container">
        <h1>Справочник телефонов</h1>
        <button
          v-on:click="isOpenModal = true"
          class="btn-common btn-add"
          type="button"
        >
          Добавить
        </button>
        <!-- <button
          v-on:click="clear"
          class="btn-common btn-add"
          type="button"
        >
          clear storage
        </button> -->
        <table-component />
      </div>
    </div>
    <modal-component v-if="isOpenModal" v-on:close="isOpenModal = false">
      <create-user-form
        v-on:create="createUsers"
        v-on:extra-emit="isOpenModal = false"
      />
    </modal-component>
  </div>
</template>

<script>
import CreateUserForm from "./components/CreateUserForm.vue";
import TableComponent from "./components/Table.vue";

const storageKey = "users";

export default {
  name: "App",
  components: {
    TableComponent,
    CreateUserForm,
    ModalComponent: () => import("./components/Modal.vue")
  },
  data() {
    return {
      isOpenModal: false,
      users: []
    };
  },
  provide() {
    return {
      usersApp: () => this.users
    };
  },
  created() {
    this.upload();
  },
  methods: {
    // ...mapMutations(["CLEAR_STORAGE", "UPLOAD_STORAGE_USERS"]),
    upload() {
      const items = localStorage.getItem(storageKey);
      this.users = items ? JSON.parse(items) : [];
    },
    createUsers({ name, phone, parent_phone }) {
      const newUser = {
        name,
        phone,
        parent_phone,
        children: []
      };

      let isFindParent;
      if (parent_phone)
        isFindParent = this.users.find(
          element => element.phone === parent_phone
        );
      if (isFindParent) isFindParent.children.push({ name, phone });

      this.users.push({
        ...newUser,
        ...{ order: isFindParent ? isFindParent.order + 1 : 1 }
      });

      localStorage.setItem(storageKey, JSON.stringify(this.users));
    },
    clear() {
      localStorage.clear();
      this.users = [];
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
}
html,
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2;
  height: 100%;
  position: relative;
}
button {
  border: none;
  background: none;
  display: inline-block;
  cursor: pointer;
  font-weight: 600;
}
.wrapper {
  padding: 2em 0;
}
.container {
  width: 100%;
  max-width: calc(1280px + 1em * 2);
  padding: 0px 1em;
  margin: 0 auto;
}
h1 {
  font-weight: 700;
  font-size: 2em;
  margin: 0.5em 0;
  text-align: center;
}
.btn-common {
  padding: 1em 2.5em;
  border-radius: 0.7em;
}
.btn-add {
  border: 1px solid black;
  background: hsla(0, 0%, 0%, 0.2);
}
</style>
