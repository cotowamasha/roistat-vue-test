<template>
  <div v-on:click.stop="close" class="modal">
    <div class="modal-content">
      <h1>{{ title }}</h1>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Создать контакт"
    }
  },
  name: "ModalComponent",
  mounted() {
    document.body.style.overflow = "hidden";
  },
  beforeDestroy() {
    document.body.style.overflow = "auto";
  },
  methods: {
    close(e) {
      if (e.target === this.$el) this.$emit("close");
      else return;
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: hsla(0, 0%, 0%, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.modal-content {
  padding: 3em;
  background: white;
  border: 1px solid;
  cursor: auto;
  max-height: 90%;
  overflow-y: auto;
  height: fit-content;
}
.modal-content::-webkit-scrollbar {
  display: block;
  width: 14px;
  background-color: transparent;
}
.modal-content::-webkit-scrollbar-thumb {
  background-color: hsla(0, 0%, 0%, 0.5);
  border-radius: 100px;
  border: 4px solid white;
}
</style>
