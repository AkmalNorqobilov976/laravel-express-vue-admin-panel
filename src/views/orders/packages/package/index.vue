<template>
  <el-main>
    <data-table
      ref="packageDataTable"
      :columns="packageColumns"
      :getData="getData"
    >
      <div slot="button">
        <el-button
          type="success"
          @click="$router.push('/orders/packages/package/create')"
          >Qo'shish</el-button
        >
      </div>
      <div slot="data-table-filter" class="mt-2">
        <el-row>
          
          <el-col :span="2">
            <el-button type="warning" @click="clearFilterAttributes" size="mini"
              >filterni tozalash</el-button
            >
          </el-col>
          <el-col class="custom-col" :span="2">
            <el-checkbox v-model="filterAttributes.in_storage"
              >Skladdami?</el-checkbox
            >
          </el-col>
          <el-col :span="6" class="custom-col">
            <el-select
              class="w-full"
              size="mini"
              v-model="filterAttributes.status"
              placeholder="Holati"
            >
              <el-option label="Aktiv" value="active"> </el-option>
              <el-option label="Bajarilgan" value="completed"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="custom-col">
            <el-select
              v-model="filterAttributes.from_region_id"
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
          <el-col :span="4" class="custom-col">
            <el-select
              v-model="filterAttributes.to_region_id"
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
        </el-row>
      </div>
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
import { clearFilterAttributes } from "@/utils/former";
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
        prop: "driver_id",
        label: "Kuryer",
        sortable: true,
      },
      {
        prop: "matter",
        label: "Buyurtma",
        sortable: true,
      },
      {
        prop: "is_paid",
        label: "Oldindan to'lov",
        sortable: true,
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
      in_storage: "",
      status: "",
      from_region_id: "",
      to_region_id: "",

    },
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
    getRegions() {
      this.$store.dispatch("region/getLocations").then((response) => {
        this.filterData.regions = [...response.data];
      });
    },

    dateFormat(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
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