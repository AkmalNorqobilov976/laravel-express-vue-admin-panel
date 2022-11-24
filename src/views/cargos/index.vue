<template>
  <el-main>
    <el-button type="success" @click="$router.push('/cargos/create')"
      >Qo'shish</el-button
    >
    <data-table ref="cargoDataTable" :columns="cargoColumns" :getData="getData">
      <div slot="created_at" slot-scope="{row}">
        {{formatDate(row.created_at)}}
      </div>
      <div slot="actions" slot-scope="{ row }">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteCargo(row.id)"
          round
          size="small"
        ></el-button>
        <el-button
          icon="el-icon-edit"
          round
          size="small"
          @click="$router.push(`/cargos/update/${row.id}`)"
        ></el-button>
      </div>
    </data-table>
  </el-main>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { getCargosByPagination } from "@/api/cargo";
import { getErrorMessage } from "@/utils/error-message";
import moment from 'moment';
export default {
  data: () => ({
    cargoColumns: [
      {
        prop: "creator_id",
        label: "Mijoz",
        sortable: true
      },
      {
        prop: "from_region_id",
        label: "Qayerdan",
        sortable: true
      },
      {
        prop: "to_region_id",
        label: "Qayerga",
        sortable: true
      },
      {
        prop: "cost",
        label: "Narxi",
        sortable: true
      },
      {
        prop: "note",
        label: "Izoh",
        sortable: true
      },
      {
        prop: "weight",
        label: "Yuk og'irligi",
        sortable: true
      },
      {
        prop: "matter",
        label: "Yuk",
        sortable: true
      },
      {
        prop: 'status',
        label: "Status",
        sortable: true
      },
      {
        prop: "created_at",
        label: "Qo'shilgan sana",
        sortable: true
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
      return getCargosByPagination(page).then((response) => {
        let { data } = response;
        return {
          data: data.data,
          total: data.meta.total,
        };
      });
    },
    deleteCargo(cargoId) {
      this.$confirm("Ushbu yukni rostan ham o'chirmoqchisizmi?").then(() => {
        this.$store
          .dispatch("cargo/deleteCargo", cargoId)
          .then(() => {
            this.$message({
              showClose: true,
              message: "Muvaffaqiyatli o'chirildi!!!",
              type: "success",
            });
            this.$refs.cargoDataTable.getTableData();
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: getErrorMessage(error),
              type: "error",
            });
          });
      });
    },

    formatDate(date){
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
};
</script>