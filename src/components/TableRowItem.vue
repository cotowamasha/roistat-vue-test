<template>
  <div class="table-row-wrapper">
    <div
      @click="open(!!user.children.length)"
      :class="{ clickable: user.children.length }"
      class="table-row-item"
    >
      <div
        :class="{
          invisible: !user.children.length,
          open: isOpenChildren
        }"
        class="table-row-icon"
      >
        <span>+</span>
      </div>
      <div class="table-row-content">
        {{ user.name }}
      </div>
      <div class="table-row-content">
        {{ user.phone }}
      </div>
    </div>
    <table-row-children
      v-if="user.children.length"
      v-show="isOpenChildren"
      :parent_phone="user.phone"
      :order="order + 1"
      :users="children"
    />
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    },
    children: {
      type: Array
    },
    order: {
      type: Number
    }
  },
  components: {
    TableRowChildren: () => import("./TableRow.vue")
  },
  data() {
    return {
      isOpenChildren: false
    };
  },
  name: "TableRowItem",
  methods: {
    open(isHasChildren, phone) {
      if (isHasChildren)
        this.isOpenChildren = this.isOpenChildren = !this.isOpenChildren;
      else return;
    }
  }
};
</script>
