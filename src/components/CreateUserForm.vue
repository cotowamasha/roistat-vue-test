<template>
  <form v-on:submit.prevent="submit" class="form">
    <input-component
      v-model="name"
      v-on:change-input="name = $event"
      :error="errors.name"
      v-on:clear-error="errors.name = $event"
      label="Имя*"
      placeholder="Имя*"
      required
    />
    <input-component
      v-model="phone"
      v-on:change-input="phone = $event"
      :error="errors.phone"
      v-on:clear-error="errors.phone = $event"
      label="Номер телефона*"
      type="tel"
      placeholder="89111232345"
      pattern="8[0-9]{10}"
      required
    />
    <select-component
      v-if="users.length"
      v-model="parent_phone"
      :values="users"
      :options="{
        label: 'name',
        code: 'phone'
      }"
      @change-select="parent_phone = $event"
      label="Начальник"
    />
    <button type="submit" class="btn-common">Добавить</button>
  </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import InputComponent from "./Input.vue";
import SelectComponent from "./Select.vue";
export default {
  components: { InputComponent, SelectComponent: () => import("./Select.vue") },
  name: "CreateUserForm",
  data() {
    return {
      name: "",
      phone: "",
      parent_phone: null,
      errors: {
        name: "",
        phone: ""
      }
    };
  },
  computed: {
    ...mapState(["users"])
  },
  methods: {
    ...mapMutations(["CREATE_USER"]),
    submit() {
      if (this.validate()) {
        const { name, phone, parent_phone } = this;
        this.CREATE_USER({ name, phone, parent_phone });
        this.$emit("extra-emit");
      }
    },
    validate() {
      const { phone, errors, users } = this;

      const isFindDuplicate = users.find(element => element.phone === phone);
      if (isFindDuplicate) {
        errors.phone = "Пользователь с таким номером уже сужествует";
        return false;
      }
      
      return true;
    }
  }
};
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}
</style>
