<template>
  <div class="label">
    <span v-if="label">{{ label }}</span>
    <button v-on:click="isOpenOptions = !isOpenOptions" type="button" class="field">
      {{ value }}
    </button>
    <div v-show="isOpenOptions" class="options">
      <button
        v-for="value of values"
        :key="value[options.code]"
        v-on:click="
          $emit('change-select', value[options.code]), (isOpenOptions = false)
        "
        class="option"
        type="button"
      >
        {{ value[options.label] }}
      </button>
    </div>
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    error: {
      type: String
    },
    value: {},
    values: {
      type: Array
    },
    options: {
      type: Object
    }
  },
  name: "SelectComponent",
  data() {
    return {
      isOpenOptions: false
    };
  }
};
</script>

<style scoped>
.label {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  position: relative;
}
.field {
  height: 2em;
  padding: 0.4em 1em;
  border: 1px solid;
  text-align: left;
}
.options {
  display: flex;
  flex-direction: column;
  max-height: 90px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  padding: 0 1em;
  top: 100%;
  left: 0;
  border: 1px solid;
  border-top: none;
  background: white;
}

.option {
  text-align: left;
  padding: 0.5em 0;
  border-bottom: 1px solid;
}
.option:last-child {
  border-bottom: none;
}
</style>
