<template>
  <el-main>
    <el-button type="success" @click="$router.push('/storages/create')"
      >Qo'shish</el-button
    >
    <data-table
      ref="storageDataTable"
      :columns="storageColumns"
      :getData="getData"
    >
      <div slot="region_id" slot-scope="{ row }">
        {{ row.region.name }}
      </div>
      <div slot="logo" slot-scope="{row}">
        <div v-if="row.logo">
          <img height="60" :src="row.logo.original_url" alt="">
        </div>
      </div>
      <div slot="district_id" slot-scope="{ row }">
        <div v-if="row.district">
          {{ row.district.name }}
        </div>
      </div>
      <div slot="created_at" slot-scope="{ row }">
        {{ dateFormat(row.created_at) }}
      </div>
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
import moment from "moment";
export default {
  data: () => ({
    storageColumns: [
      {
        prop: "id",
        label: "#ID",
      },
      {
        prop: "logo",
        sortable: true,
        label: "Logotip"
      },
      {
        prop: "name",
        sortable: true,
        label: "Nomi",
      },
      {
        prop: "region_id",
        sortable: true,
        label: "Viloyat",
      },
      {
        prop: "district_id",
        sortable: true,
        label: "Tuman",
      },
      {
        prop: "created_at",
        sortable: true,
        label: "Qo'shilgan vaqti",
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
          console.log(data);
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

    dateFormat(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
  },
};
</script>