<template>
  <section class="table">
    <div class="table-row-wrapper">
      <div class="table-row-item">
        <div class="table-row-icon invisible"><span></span></div>
        <div class="table-row-title">
          <button
            v-on:click.stop="setSortBy('name')"
            class="table-row-sort"
            type="button"
          >
            Имя
            <svg
              v-show="sortBy && sortBy.includes('name')"
              :class="{ up: sortBy && sortBy.includes('up') }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          </button>
        </div>
        <div class="table-row-title">
          <button
            v-on:click.stop="setSortBy('phone')"
            class="table-row-sort"
            type="button"
          >
            Номер телефона
            <svg
              v-show="sortBy && sortBy.includes('phone')"
              :class="{ up: sortBy && sortBy.includes('up') }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <table-row v-if="users.length" :users="users" />
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    TableRow: () => import("./TableRow.vue")
  },
  name: "TableComponent",
  data() {
    return {
      sortBy: null
    };
  },
  computed: {
    ...mapState(["users"])
  },
  provide() {
    return {
      sortBy: () => this.sortBy
    };
  },
  methods: {
    setSortBy(field) {
      if (!this.sortBy || !this.sortBy.includes(field)) {
        this.sortBy = field + ":up";
      } else if (this.sortBy.includes("up") && this.sortBy.includes(field)) {
        this.sortBy = field + ":down";
      } else {
        this.sortBy = null;
      }
    }
  }
};
</script>

<style>
.table {
  width: 100%;
  margin: 2em 0;
  border: 1px solid;
}
.table-row-wrapper {
  width: 100%;
  padding: 0.8em 0.8em 0 0.8em;
}
.table-row-wrapper:last-child > .table-row-item,
.table-row-content {
  border-bottom: none;
}
.table-row-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid;
  padding-bottom: 0.8em;
}
.table-row-icon {
  width: 20px;
  margin: 0px 0.5em;
  transition: transform 0.3s;
}
.table-row-icon span {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  transition: transform 0.3s;
}
.table-row-icon.open span {
  transform: rotate(45deg);
}
.table-row-icon.invisible {
  visibility: hidden;
}
.table-row-title,
.table-row-content {
  width: 100%;
  border-left: 1px solid;
  padding: 0px 1em;
}
.table-row-title {
  font-weight: bold;
  text-align: center;
}
.table-row-content {
  text-align: left;
}
.table-row-sort {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.table-row-sort svg {
  width: 20px;
  height: 20px;
}
.table-row-sort svg.up {
  transform: rotate(180deg);
}
</style>
