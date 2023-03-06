<template>
  <label class="label">
    <span v-if="label">{{ label }}</span>
    <input
      :type="type"
      :value="value"
      v-on:input="
        $emit('change-input', $event.target.value), $emit('clear-error', '')
      "
      :pattern="pattern"
      :placeholder="placeholder"
      required
    />
    <span v-if="error" class="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    value: {},
    error: {
      type: String
    },
    pattern: {
      type: String
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  name: "InputComponent"
};
</script>

<style scoped>
.label {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  position: relative;
}
.error {
  font-size: 0.6em;
  color: red;
  position: absolute;
  top: calc(100% + 0.2em);
}
</style>
