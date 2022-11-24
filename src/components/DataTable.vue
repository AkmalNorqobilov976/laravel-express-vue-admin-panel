<template>
  <div>
    <el-row>
      <el-col :span="4">
        <slot name="button" />
      </el-col>
      <el-col :span="6" :offset="14">
        <form @submit.prevent="onSearch">
          <el-input
            placeholder="Qidiruv"
            type="search"
            v-model="search"
            suffix-icon="el-icon-search"
          />
        </form>
      </el-col>
    </el-row>
    <div class="mt-2">
      <slot name="data-table-filter"> </slot>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      v-bind="$attrs"
      :row-class-name="rowClassName"
      ref="multipleTable"
      class="mt-2"
      border
      @row-click="rowClick"
      v-on="listeners"
    >
      <slot name="columns">
        <el-table-column
          v-if="isCheckbox"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          :sortable="column.sortable ? true : false"
          v-for="column in columns"
          :key="column.prop"
          v-bind="column"
        >
          <template slot-scope="{ row }">
            <slot :name="column.prop || column.type || column.label" :row="row">
              {{ row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </slot>
    </el-table>
    <slot name="pagination" :page="page" :total="total">
      <el-pagination
        v-model="page"
        :total="total"
        @current-change="getTableData"
        layout="prev, pager, next"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  inheritAttrs: false,
  props: {
    isCheckbox: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    getData: {
      type: Function,
      default: () => Promise.resolve([]),
    },
    rowClick: {
      type: Function,
      default: () => null,
    },
  },
  data() {
    return {
      search: "",
      tableData: [],
      page: 1,
      total: 10,
      sortParams: "&sortByDesc=id",
      loading: false,
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        ["sort-change"]: this.onSortChange,
      };
    },
  },
  watch: {
    search(newSearch, oldSearch) {
      if (newSearch == "") {
        this.getTableData(this.page);
      }
    },
  },
  methods: {
    async getTableData(page) {
      this.loading = true;
      let reqPage = page || this.page;
      try {
        let response = await this.getData({
          page: reqPage,
          query: this.search,
          sortParams: this.sortParams,
        });
        this.tableData = response.data;
        this.total = response.total;
      } finally {
        this.loading = false;
      }
    },
    onSortChange({ column, prop, order }) {
      if (prop !== null) {
        let shortOrder = order === "ascending" ? "asc" : "desc";
        // this.sortParams = [`${prop}|${shortOrder}`];
        if (shortOrder == "desc") {
          this.sortParams = `&sortByDesc=${prop}`;
        } else {
          this.sortParams = `&sortBy=${prop}`;
        }
      } else {
        this.sortParams = [];
      }
      this.getTableData(this.page);
    },
    onSearch() {
      if (this.search) {
        this.getTableData(this.page);
      }
    },
    rowClassName(row, rowId) {
      console.log(row, rowId);
      return {
        background: "blue",
      };
    },
  },
  created() {
    this.getTableData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.custom-table-row {
  background: red;
  border: 2px solid blue;
}
.el-table .el-table__body-wrapper .el-table__body {
  border-collapse: separate;
  background: red;
}
</style>
