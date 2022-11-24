<template>
  <el-main>
    <data-table
      ref="storageDataTable"
      :columns="storageColumns"
      :getData="getData"
    >
      <template #button>
        <el-button type="success" @click="$router.push('/storages/create')"
          >Qo'shish</el-button
        >
      </template>
      <template #data-table-filter>
        <el-row>
          <el-col :span="2">
            <el-button type="warning" @click="clearFilterAttributes" size="mini"
              >filterni tozalash</el-button
            >
          </el-col>
          <el-col :span="6" class="custom-col">
            <el-select
              v-model="filterAttributes.region_id"
              size="mini"
              class="w-full"
              filterable
              allow-create
              default-first-option
              placeholder="Viloyatlar"
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
      </template>
      <div slot="logo" slot-scope="{ row }">
        <img :src="row.logo" height="60" alt="" />
      </div>
      <div slot="region_id" slot-scope="{ row }">
        {{ row.region.name }}
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
import { clearFilterAttributes } from "@/utils/former";
import moment from "moment";
export default {
  data: () => ({
    storageColumns: [
      {
        prop: "id",
        label: "#ID",
        sortable: true,
      },
      {
        prop: "logo",
        sortable: true,
        label: "Logotip",
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
    filterData: {
      regions: [],
    },
    filterAttributes: {
      region_id: "",
    },
  }),
  components: { DataTable },
  watch: {
    "filterAttributes.region_id"(newRegion) {
      this.$refs.storageDataTable.getTableData();
    },
  },
  methods: {
    getData({ page, query, sortParams }) {
      return getStoragesByPagination(
        page,
        query,
        sortParams,
        this.filterAttributes
      )
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