<template>
  <el-main>
    <el-button @click="$router.push('/location/regions/create')" type="success"
      >Qo'shish</el-button
    >
    <data-table ref="regionTable" :columns="columns" :getData="getData">
      <div slot="options" slot-scope="{ row }">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteRegion(row.id)"
          round
          size="small"
        ></el-button>
        <el-button
          icon="el-icon-edit"
          round
          size="small"
          @click="$router.push(`/location/regions/update/${row.id}`)"
        ></el-button>
      </div>
    </data-table>
  </el-main>
</template>

<script>
import { getRegionsByPagination } from "@/api/region";
import DataTable from "@/components/DataTable.vue";
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
        prop: "name",
        label: "Nomi",
        minWidth: "100",
      },
      {
        prop: "code",
        label: "Kodi",
        minWidth: "100",
      },
      {
        prop: "is_pinned",
        label: "Pin Qilinganmi",
        minWidth: "80",
        sortable: true,
      },
      {
        prop: "delivery_amount",
        label: "Yetkazib berishlar miqdori",
        width: "150",
      },
      {
        prop: "delivery_timer_in_hours",
        label: "Yetkazib berish miqdori",
        width: "150",
      },
      {
        prop: "options",
        label: "Options",
      },
    ],
  }),
  methods: {
    getTransports() {
      return getTransportsByPagination(1);
    },
    getData({ page, query, sortParams }) {
      return getRegionsByPagination(page).then((response) => {
        let { data } = response;
        return {
          data: data.data,
          total: data.meta.total,
        };
      });
    },
    deleteRegion(regionId) {
      this.$confirm("Ushbu viloyatni rostan ham o'chirmoqchisizmi?").then(
        () => {
          this.$store
            .dispatch("region/deleteRegion", regionId)
            .then((response) => {
              this.$message({
                showClose: true,
                message: "Viloyat muvaffaqiyatli o'chirildi!!!",
                type: "success",
              });

              this.$refs.regionTable.getTableData(1);
            });
        }
      );
    },
  },
  components: { DataTable },
};
</script>