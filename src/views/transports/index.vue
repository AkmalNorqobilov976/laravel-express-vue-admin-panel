<template>
  <el-main>
    <el-button @click="$router.push('/transports/create')" type="success"
      >Qo'shish</el-button
    >
    <data-table ref="transportDataTable" :columns="columns" :getData="getData">
      <div slot="creator_id" slot-scope="{ row }">
        {{ row.creator.name }} {{ row.creator.email }}
      </div>
      <div slot="created_at" slot-scope="{ row }">
        {{formatDate(row.created_at)}}
      </div>
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
import moment from "moment";
export default {
  data: () => ({
    columns: [
      {
        prop: "id",
        label: "ID",
        minWidth: "20",
        sortable: true,
      },
      {
        prop: "creator_id",
        label: "Mijoz",
      },
      {
        prop: "from_address",
        sortable: true,
        label: "Qayerdan",
        minWidth: "100",
      },
      {
        prop: "to_address",
        sortable: true,
        label: "Qayerga",
        minWidth: "100",
      },
      {
        prop: "transport_type",
        sortable: true,
        label: "Transport Turi",
        minWidth: "80",
        sortable: true,
      },
      {
        prop: 'cost',
        sortable: true,
        label: "Narxi"
      },
      {
        prop: "status",
        sortable: true,
        label: "Status",
        width: "150",
      },
      {
        prop: "created_at",
        sortable: true,
        label: "Qo'shilgan sana",
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
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
  components: { DataTable },
};
</script>