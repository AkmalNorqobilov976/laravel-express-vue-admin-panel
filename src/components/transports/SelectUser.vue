<template>
  <div>
    <el-dialog :visible.sync="userDialog">
      <data-table
        ref="userDataTable"
        :columns="userColumns"
        :getData="getData"
        :rowClick="rowClick"
      ></data-table>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers } from "@/api/user";
import DataTable from "../DataTable.vue";
export default {
  props: {
    userDialog: {
      type: Boolean,
      default: false,
    },
    modelValue: {},
  },
  data: () => ({
    userColumns: [
      {
        prop: "name",
        label: "Ismi",
        sortable: true,
      },
      {
        prop: "email",
        label: "Email",
        sortable: true,
      },
      {
        prop: "created_at",
        label: "Registratsiyadan o'tgan vaqti",
        sortable: true,
      },
    ],
  }),
  methods: {
    getData({ page, query, sortParams }) {
      return getUsers(page).then((response) => {
        let { data } = response;
        return {
          data: data.data,
          total: data.meta.total,
        };
      });
    },
    rowClick($event) {
      this.$emit("click-user", $event);
    },
  },
  components: { DataTable },
};
</script>