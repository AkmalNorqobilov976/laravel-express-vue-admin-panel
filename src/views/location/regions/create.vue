<template>
  <el-main>
    <el-form
      ref="createRegionForm"
      :model="createRegionForm"
      :rules="createRegionRules"
      auto-complete="on"
    >
      <el-row>
        <el-col :span="12">
          <div class="custom-col">
            <el-form-item label="Nomi" prop="name">
              <el-input
                ref="name"
                v-model="createRegionForm.name"
                placeholder="Viloyat nomini kiriting"
                type="text"
                :disabled="isCreateRegionFormDisabled"
              />
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="custom-col">
            <el-form-item label="Kod" prop="code">
              <el-input
                ref="code"
                v-model="createRegionForm.code"
                placeholder="Kodni kiriting!!!"
                type="text"
                :disabled="isCreateRegionFormDisabled"
              />
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="custom-col">
            <el-form-item label="Pin Qilinganmi">
              <el-switch
                v-model="createRegionForm.is_pinned"
                :disabled="isCreateRegionFormDisabled"
              />
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="custom-col">
            <el-form-item label="Chaqiruv kodi" prop="calling_code">
              <el-input
                v-model="createRegionForm.calling_code"
                ref="calling_code"
                placeholder="Chaqiruv kodi"
                type="text"
                :disabled="isCreateRegionFormDisabled"
              />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="custom-col">
            <el-form-item
              label="Yetkazib berish miqdori"
              prop="delivery_amount"
            >
              <el-input
                v-model="createRegionForm.delivery_amount"
                placeholder="Yetkazib berish miqdori"
                type="number"
                :disabled="isCreateRegionFormDisabled"
              />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="custom-col">
            <el-form-item
              label="Yetkazib berish vaqti"
              prop="delivery_timer_in_hours"
            >
              <el-input
                v-model="createRegionForm.delivery_timer_in_hours"
                placeholder="Necha soatda yetkazib berilsin"
                type="number"
                :disabled="isCreateRegionFormDisabled"
              />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-button
        type="success"
        @click="createRegion()"
        :disabled="isCreateRegionFormDisabled"
        >Saqlash</el-button
      >
      <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
    </el-form>
    <div v-if="createdRegion">
      <div class="mt-2">
        <el-button @click="dialog = true">Tuman qo'shish</el-button>
      </div>
      <el-dialog title="Outer Dialog" :visible.sync="dialog">
        <el-form
          ref="createDistrictForm"
          :model="createDistrictForm"
          :rules="createDistrictRules"
          auto-complete="on"
        >
          <div class="dialog-district-form">
            <div class="custom-col my-1">
              <div>
                <el-form-item label="Tuman nomi" prop="name">
                  <el-input
                    v-model="createDistrictForm.name"
                    placeholder="Tuman nomi"
                    type="text"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="custom-col my-1">
              <el-form-item label="Tuman Kod" prop="code">
                <el-input
                  v-model="createDistrictForm.code"
                  placeholder="Tuman kodi"
                  type="text"
                ></el-input>
              </el-form-item>
            </div>
            <div class="custom-col my-1">
              <el-form-item label="Ulanganmi" prop="is_enabled">
                <el-switch v-model="createDistrictForm.is_enabled" />
              </el-form-item>
            </div>
            <div class="custom-col my-1">
              <el-form-item
                label="Yetkazib berishlar miqdori"
                prop="delivery_amount"
              >
                <el-input
                  v-model="createDistrictForm.delivery_amount"
                  placeholder="Yetkazib berishlar miqdori"
                  type="number"
                ></el-input>
              </el-form-item>
            </div>
          </div>

          <div>
            <el-form-item
              label="Yetkazib berishlar vaqti"
              prop="delivery_timer_in_hours"
            >
              <el-input
                v-model="createDistrictForm.delivery_timer_in_hours"
                placeholder="Yetkazib berishlar vaqti"
                type="number"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="success"
            @click="isUpdate ? updateDistrict() : createDistrict()"
            >{{ isUpdate ? "Yangilash" : "Saqlash" }}</el-button
          >
          <el-button
            @click="
              dialog = false;
              isUpdate = false;
            "
            >Cancel</el-button
          >
        </div>
      </el-dialog>
      <data-table
        ref="districtsTable"
        :columns="districtColumns"
        isCheckbox
        :getData="getDistrictsData"
      >
        <div slot="options" slot-scope="{ row }">
          <el-button
            type="danger"
            icon="el-icon-delete"
            round
            size="small"
            @click="deleteDistrict(row.id)"
          ></el-button>
          <el-button
            icon="el-icon-edit"
            round
            size="small"
            @click="updateDistrictDialog(row)"
          ></el-button>
        </div>
      </data-table>
    </div>
    <!-- {{$refs.districtsTable}} districts table -->
  </el-main>
</template>


<script>
import DataTable from "@/components/DataTable.vue";
import { mixinCreate } from "./mixins/mixinCreate";
import { deleteDistrictMixin } from "./mixins/deleteDistrictMixin";
export default {
  components: { DataTable },
  data() {
    const dialog = false;
    const createdRegion = null;
    const districtColumns = [
      {
        prop: "name",
        label: "Tuman nomi",
      },
      {
        prop: "options",
        label: "Options",
      },
    ];
    return {
      isUpdate: false,
      createdRegion,
      dialog,
      districtColumns,
      isCreateRegionFormDisabled: false,
      createRegionForm: {
        name: "",
        code: "",
        is_pinned: false,
        calling_code: "",
        delivery_amount: undefined,
        delivery_timer_in_hours: undefined,
      },
      createDistrictForm: {
        country_id: undefined,
        is_enabled: false,
        name: "",
        code: "",
        delivery_amount: undefined,
        delivery_timer_in_hours: undefined,
      },
    };
  },
  mixins: [mixinCreate, deleteDistrictMixin],
  methods: {
    getDistrictsByRegionId() {
      this.$store
        .dispatch("region/getDistrictsByRegionId", this.createdRegion.id)
        .then((response) => {
          this.$refs.districtsTable.tableData = [...response.data];
        });
    },
    createRegion() {
      this.$refs.createRegionForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("region/createOneRegion", this.createRegionForm)
            .then((response) => {
              this.createdRegion = response.data;
              this.$message({
                showClose: true,
                message: "Yangi viloyat qo'shildi!!!",
                type: "success",
              });

              this.createDistrictForm.country_id = this.createdRegion.id;
              this.isCreateRegionFormDisabled = true;
            })
            .catch((error) => {
              this.$message({
                showClose: true,
                message: JSON.stringify(error, null, 4),
                type: "error",
              });
            });
        }
      });
    },
    createDistrict() {
      this.$refs.createDistrictForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("region/createOneDistrict", this.createDistrictForm)
            .then((response) => {
              this.$message({
                showClose: true,
                message: "Tuman qo'shish muvaffaqiyatli yakunlandi!!!",
                type: "success",
              });
              this.$refs.createDistrictForm.resetFields();
              this.$refs.districtsTable.tableData.push(response.data);
            })
            .catch((error) => {
              this.$message({
                showClose: true,
                message: JSON.parse(JSON.stringify(error, null, 4)).response
                  .data.message,
                type: "error",
              });
            });
        }
      });
    },

    getDistrictsData({ page, query, sortParams }) {
      return getDistrictsByRegionId(this.createdRegion.id).then((response) => {
        const { data } = response;

        return {
          data: data.data,
          total: data.meta.total,
        };
      });
    },

    updateDistrictDialog(district) {
      this.isUpdate = true;
      this.createDistrictForm = district;
      this.dialog = true;
    },

    updateDistrict() {
      this.$refs.createDistrictForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("region/updateDistrict", this.createDistrictForm)
            .then((response) => {
              this.$message({
                showClose: true,
                message: "Tuman muvaffaqiyatli yangilandi!!!",
                type: "success",
              });
              this.$refs.createDistrictForm.resetFields();
              this.isUpdate = false;
              this.dialog = false;
              this.getDistrictsByRegionId();
            })
            .catch((error) => {
              this.$message({
                showClose: true,
                message: JSON.parse(JSON.stringify(error, null, 4)).response
                  .data.message,
                type: "error",
              });
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.mt-2 {
  margin-top: 2em;
}

.my-1 {
  margin-top: 1em;
  margin-bottom: 1em;
}

.dialog-district-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

/* .dialog-district-form div:last-child {
  grid-column: 0/2;
  background: blue;
} */
.last-child {
  grid-column: 0/2;
  background: red;
}
</style>