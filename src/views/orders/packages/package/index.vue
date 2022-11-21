<template>
  <el-main>
    <el-button
      type="success"
      @click="$router.push('/orders/packages/package/create')"
      >Qo'shish</el-button
    >
    <data-table
      ref="packageDataTable"
      :columns="packageColumns"
      :getData="getData"
    >
      <div slot="from_region" slot-scope="{ row }">
        <i
          >{{ row.from_region.name }}
          <span v-if="row.from_district">{{ row.from_district.name }}</span></i
        >
      </div>

      <div slot="to_region" slot-scope="{ row }">
        <i
          >{{ row.to_region.name }}
          <span v-if="row.to_district">{{ row.to_district.name }}</span></i
        >
      </div>

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
        prop: "from_region",
        label: "Qayerdan",
        sortable: true,
      },
      {
        prop: "to_region",
        label: "Qayerga",
        sortable: true,
      },
      {
        prop: "creator_id",
        label: "Kimdan",
        sortable: true,
      },
      {
        prop: "delivery_fee_amount",
        label: "Narxi",
        sortable: true,
      },
      {
        prop: "note",
        label: "Izoh",
        sortable: true,
      },
      {
        prop: "status",
        label: "Status",
        sortable: true,
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