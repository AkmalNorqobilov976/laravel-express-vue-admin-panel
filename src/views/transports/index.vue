<template>
  <el-main>
    <el-button @click="$router.push('/transports/create')" type="success"
      >Qo'shish</el-button
    >
    <data-table ref="transportDataTable" :columns="columns" :getData="getData">
      <div slot="actions" slot-scope="{ row }">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteTransport(row.id)"
          round
          size="small"
        ></el-button>
        <el-button
          icon="el-icon-edit"
          round
          size="small"
          @click="$router.push(`/transports/update/${row.id}`)"
        ></el-button>
      </div>
    </data-table>
  </el-main>
</template>

<script>
import { getTransportsByPagination } from "@/api/transport";
import DataTable from "@/components/DataTable.vue";
import { getErrorMessage } from "@/utils/error-message";
export default {
  data: () => ({
    columns: [
      {
        prop: "id",
        label: "#ID",
        minWidth: "20",
        sortable: true,
      },
      {
        prop: "from_address",
        label: "Qayerdan",
        minWidth: "100",
      },
      {
        prop: "to_address",
        label: "Qayerga",
        minWidth: "100",
      },
      {
        prop: "transport_type",
        label: "Transport Turi",
        minWidth: "80",
        sortable: true,
      },
      {
        prop: "status",
        label: "Status",
        width: "150",
      },
      {
        prop: "actions",
        label: "Actions",
      },
    ],
  }),
  methods: {
    // getTransports() {
    //   return getTransportsByPagination(1);
    // },
    getData({ page, query, sortParams }) {
      return getTransportsByPagination(page).then((response) => {
        let { data } = response;
        return {
          data: data.data,
          total: data.meta.total,
        };
      });
    },
    deleteTransport(transportId) {
      this.$confirm("Ushbu transportni haqiqatdan ham o'chirmoqchisizmi?").then(
        () => {
          this.$store
            .dispatch("transport/deleteTransport", transportId)
            .then(() => {
              this.$refs.transportDataTable.getTableData();
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
  components: { DataTable },
};
</script>