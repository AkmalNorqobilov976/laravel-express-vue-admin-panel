<template>
  <el-main>
    <data-table ref="transportDataTable" :columns="columns" :getData="getData">
      <template #button>
        <el-button @click="$router.push('/transports/create')" type="success"
          >Qo'shish</el-button
        >
      </template>
      <div slot="data-table-filter">
        <el-row>
          <el-col :span="2">
            <el-button
              @click="clearFilterAttributes()"
              size="mini"
              type="warning"
              >filterni tozalash</el-button
            >
          </el-col>
          <el-col :span="6" class="custom-col">
            <el-select
              v-model="filterAttributes.fromRegionId"
              size="mini"
              class="w-full"
              filterable
              allow-create
              default-first-option
              placeholder="Qaysi viloyatdan"
            >
              <el-option
                v-for="(item, i) in filterData.regions"
                :key="i"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="custom-col">
            <el-select
              v-model="filterAttributes.toRegionId"
              size="mini"
              class="w-full"
              filterable
              allow-create
              default-first-option
              placeholder="Qaysi viloyatga"
            >
              <el-option
                v-for="(item, i) in filterData.regions"
                :key="i"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="custom-col-pr-0">
            <el-select
              class="w-full"
              size="mini"
              placeholder="Transport turi"
              v-model="filterAttributes.type"
            >
              <el-option label="Taxida" value="car"></el-option>
              <el-option label="Piyoda" value="special_car"></el-option>
              <el-option label="Yuk mashinada" value="truck"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div slot="creator_id" slot-scope="{ row }">
        {{ row.creator_name }}
      </div>
      <div slot="from_region_id" slot-scope="{ row }">
        {{ row.from_region_name }}, {{ row.from_district_name }}
      </div>
      <div slot="to_region_id" slot-scope="{ row }">
        {{ row.to_region_name }}, {{ row.to_district_name }}
      </div>
      <div slot="created_at" slot-scope="{ row }">
        {{ formatDate(row.created_at) }}
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
import { clearFilterAttributes } from "@/utils/former";
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
        sortable: true,
      },
      {
        prop: "from_region_id",
        sortable: true,
        label: "Qayerdan",
        minWidth: "100",
      },
      {
        prop: "to_region_id",
        sortable: true,
        label: "Qayerga",
        minWidth: "100",
      },
      {
        prop: "type",
        sortable: true,
        label: "Transport Turi",
        minWidth: "80",
        sortable: true,
      },
      {
        prop: "cost",
        sortable: true,
        label: "Narxi",
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
    filterData: {
      regions: [],
    },
    filterAttributes: {
      fromRegionId: "",
      toRegionId: "",
      type: "",
    },
  }),

  components: { DataTable },
  watch: {
    "filterAttributes.fromRegionId"(newOne) {
      this.$refs.transportDataTable.getTableData();
    },
    "filterAttributes.toRegionId"(newOne) {
      this.$refs.transportDataTable.getTableData();
    },
    "filterAttributes.type"(newOne) {
      this.$refs.transportDataTable.getTableData();
    },
  },
  methods: {
    // getTransports() {
    //   return getTransportsByPagination(1);
    // },
    getData({ page, query, sortParams }) {
      return getTransportsByPagination(
        page,
        query,
        sortParams,
        this.filterAttributes
      ).then((response) => {
        let { data } = response;
        console.log(data, "data");
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
    getRegions() {
      this.$store.dispatch("region/getLocations").then((response) => {
        this.filterData.regions = [...response.data];
      });
    },
    clearFilterAttributes() {
      this.filterAttributes = clearFilterAttributes(this.filterAttributes);
    },
  },
  beforeMount() {
    this.getRegions();
  },
};
</script>