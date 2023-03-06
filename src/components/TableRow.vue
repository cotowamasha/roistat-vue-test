<template>
  <div>
    <table-row-item
      v-for="user of sortedUsers"
      :key="user.phone"
      :user="user"
      :children="children"
      :order="order"
    />
  </div>
</template>

<script>
import TableRowItem from "./TableRowItem.vue";
export default {
  name: "TableRow",
  components: {
    TableRowItem
  },
  props: {
    parent_phone: {
      type: String,
      default: null
    },
    order: {
      type: Number,
      default: 1
    },
    users: {
      type: Array
    }
  },
  inject: ["sortBy"],
  data() {
    return {
      isOpenChildren: ""
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(
        element =>
          element.order === this.order &&
          element.parent_phone === this.parent_phone
      );
    },
    sortedUsers() {
      if (!this.sortBy()) {
        return this.filteredUsers;
      } else {
        const [field, order] = this.sortBy().split(":");
        const copy = this.filteredUsers.slice()
        return copy.sort((a, b) => {
          if (order === "up") return a[field] < b[field] ? 1 : -1;
          else return a[field] > b[field] ? 1 : -1;
        });
      }
    },
    children() {
      return this.users.filter(
        element =>
          element.order !== this.order &&
          element.parent_phone !== this.parent_phone
      );
    }
  }
};
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
