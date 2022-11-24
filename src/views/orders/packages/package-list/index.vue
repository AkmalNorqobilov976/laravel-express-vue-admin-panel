<template>
  <el-main>
    <el-button
      type="success"
      @click="$router.push('/package-list/create')"
      >Qo'shish</el-button
    >
    <data-table
      ref="packageDataTable"
      :columns="packageColumns"
      :getData="getData"
    >
      <div slot="creator_id" slot-scope="{ row }">
        {{ row.creator.name }}, {{ row.creator.email }}
      </div>
      <div slot="actions" slot-scope="{ row }">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deletePackage(row.id)"
          round
          size="small"
        ></el-button>
        <el-button
          icon="el-icon-edit"
          round
          size="small"
          @click="$router.push(`/orders/packages/package/update/${row.id}`)"
        ></el-button>
      </div>
    </data-table>
  </el-main>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { getPackagesByPagination } from "@/api/package";
import { getErrorMessage } from "@/utils/error-message";
export default {
  components: { DataTable },
  data: () => ({
    packageColumns: [
      {
        prop: "id",
        label: "#ID",
        sortable: true,
      },
      {
        prop: "created_at",
        label: "Vaqti",
        sortable: true,
      },
      {
        prop: "driver_id",
        label: "Kuryer",
        sortable: true,
      },
      {
        prop: "store_id",
        label: "Magazin",
        sortable: true,
      },
      {
        prop: 'to_region_id',
        label: "Hudud",
        sortable: true,
      },
      {
        prop: "is_active",
        label: "Aktivlashtirilgan",
        sortable: true
      },
      {
        prop: "is_closed",
        label: "Yopilgan",
        sortable: true
      },
      {
        prop: "packages_count",
        label: "Pochtalar soni",
        sortable: true
      },
      {
        prop: "storage",
        label: "Filial",
        sortable: true
      },
      {
        prop: "actions",
        label: "Actions",
      },
    ],
  }),
  methods: {
    getData({ page, query, sortParams }) {
      return getPackagesByPagination(page).then((response) => {
        let { data } = response;
        return {
          data: data.data,
          total: data.meta.total,
        };
      });
    },

    deletePackage(newsId) {
      this.$confirm("Haqiqatdan ham ushbu yangilikni o'chirmoqchisizmi?").then(
        () => {
          this.$store
            .dispatch("packages/deletePackage", newsId)
            .then(() => {
              this.$message({
                showClose: true,
                message: "Yangilik muvaffaqiyatli o'chirildi!!!",
                type: "success",
              });
              this.$refs.packageDataTable.getTableData();
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