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
      v-if="usersApp().length"
      v-model="parent_phone"
      :values="usersApp()"
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
import InputComponent from "./Input.vue";
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
  inject: ['usersApp'],
  methods: {
    submit() {
      if (this.validate()) {
        const { name, phone, parent_phone } = this;
        this.$emit("create", { name, phone, parent_phone });
        this.$emit("extra-emit");
      }
    },
    validate() {
      const { phone, errors, usersApp } = this;

      const isFindDuplicate = usersApp().find(element => element.phone === phone);
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
