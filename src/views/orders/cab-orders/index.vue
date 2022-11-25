<template>
  <el-main>
    <data-table
      ref="cabOrderDataTable"
      :columns="cabOrdersColumns"
      :getData="getData"
    >
      <div slot="button">
        <el-button type="success" @click="$router.push('/cab-orders/create')"
          >Qo'shish</el-button
        >
      </div>
      <div slot="data-table-filter">
        <el-row>
          <el-col :span="2">
            <el-button
              size="mini"
              type="warning"
              @click="clearFilterAttributes()"
              >filterni tozalash</el-button
            >
          </el-col>
          <el-col :span="6" class="custom-col">
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
          <el-col :span="6" class="custom-col">
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
            <el-date-picker
              v-model="filterAttributes.createdAt"
              type="date"
              placeholder="Qo'shilgan sana"
            >
            </el-date-picker>
          </el-col>
        </el-row>
      </div>

      <div slot="from_region" slot-scope="{ row }">
        {{ row.from_region.name }}
      </div>

      <div slot="from_district" slot-scope="{ row }">
        {{ row.from_district.name }}
      </div>

      <div slot="to_region" slot-scope="{ row }">
        {{ row.to_region.name }}
      </div>

      <div slot="to_district" slot-scope="{ row }">
        {{ row.to_district.name }}
      </div>

      <div slot="actions" slot-scope="{ row }">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteCabOrder(row.id)"
          round
          size="small"
        ></el-button>
        <el-button
          icon="el-icon-edit"
          round
          size="small"
          @click="$router.push(`/cab-orders/update/${row.id}`)"
        ></el-button>
      </div>
    </data-table>
  </el-main>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { getCabOrdersByPagination } from "@/api/cab-order";
export default {
  data: () => ({
    cabOrdersColumns: [
      {
        prop: "id",
        label: "#ID",
        sortable: true,
      },
      {
        prop: "creator_id",
        label: "Mijoz",
        sortable: true,
      },
      {
        prop: "cost",
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
        prop: "created_at",
        label: "Qo'shilgan sana",
        sortable: true,
      },
      {
        prop: "from_region",
        label: "Qaysi viloyatdan",
        sortable: true,
      },
      {
        prop: "from_district",
        label: "Qaysi tumandan",
        sortable: true,
      },
      {
        prop: "to_region",
        label: "Qaysi viloyatga",
        sortable: true,
      },
      {
        prop: "to_district",
        label: "Qaysi tumanga",
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
      fromRegionId: "",
      toRegionId: "",
      status: "",
      createdAt: "",
    },
  }),
  components: { DataTable },
  watch: {
    "filterAttributes.fromRegionId"(newOne) {
      this.$refs.cargoDataTable.getTableData();
    },
    "filterAttributes.toRegionId"(newOne) {
      this.$refs.cargoDataTable.getTableData();
    },
    "filterAttributes.status"(newOne) {
      this.$refs.cargoDataTable.getTableData();
    },
    "filterAttributes.createdAt"(newOne) {
      this.$refs.cargoDataTable.getTableData();
    },
  },
  methods: {
    getData({ page, query, sortParams }) {
      return getCabOrdersByPagination(
        page,
        query,
        sortParams,
        this.filterAttributes
      ).then((response) => {
        let { data } = response;

        console.log(data);
        return {
          data: data.data,
          total: data.meta.total,
        };
      });
    },
    deleteCabOrder(cabOrderId) {
      this.$confirm("Ushbu yukni rostan ham o'chirmoqchisizmi?").then(() => {
        this.$store
          .dispatch("cab-order/deleteCabOrder", cabOrderId)
          .then(() => {
            this.$message({
              showClose: true,
              message: "Muvaffaqiyatli o'chirildi!!!",
              type: "success",
            });
            this.$refs.cabOrderDataTable.getTableData();
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
  },
};
</script>