<template>
  <el-main>
    <el-button type="success" @click="$router.push('/storages/create')"
      >Qo'shish</el-button
    >
    <data-table ref="storageDataTable" :columns="storageColumns" :getData="getData">
      <div slot="actions" slot-scope="{ row }">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteStorage(row.id)"
          round
          size="small"
        ></el-button>
        <el-button
          icon="el-icon-edit"
          round
          size="small"
          @click="$router.push(`/storages/update/${row.id}`)"
        ></el-button>
      </div>
    </data-table>
  </el-main>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { getStoragesByPagination } from "@/api/storage";
import { getErrorMessage } from "@/utils/error-message";
export default {
  data: () => ({
    storageColumns: [
      {
        prop: "name",
        label: "Nomi",
      },
      {
        prop: "region_id",
        label: "Viloyat",
      },
      {
        prop: "district_id",
        label: "Tuman",
      },

      {
        prop: "actions",
        label: "Actions",
      },
    ],
  }),
  components: { DataTable },

  methods: {
    getData({ page, query, sortParams }) {
      return getStoragesByPagination(page)
        .then((response) => {
          let { data } = response;
          return {
            data: data.data,
            total: data.meta.total,
          };
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: JSON.parse(JSON.stringify(error, null, 4)),
            type: "error",
          });
        });
    },
    deleteStorage(storageId) {
      this.$confirm("Ushbu omborxonani rostan ham o'chirmoqchisizmi?").then(
        () => {
          this.$store
            .dispatch("storage/deleteStorage", storageId)
            .then(() => {
              this.$refs.storageDataTable.getTableData();
              this.$message({
                showClose: true,
                message: "Muvaffaqiyatli o'chirildi!!!",
                type: "success",
              });

            })
            .catch((error) => {
              this.$message({
                showClose: true,
                message: getErrorMessage(error),
                type: "error",
              });
            });
        }
      );
    },
  },
};
</script>