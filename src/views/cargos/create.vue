<template>
  <el-main>
    <el-form
      ref="cargoForm"
      :model="cargoForm"
      :rules="cargoRule"
      label-position="top"
    >
      <el-row>
        <el-col :span="8" class="custom-col">
          <el-form-item label="Qaysi viloyatdan" prop="from_region_id">
            <el-select
              v-model="cargoForm.from_region_id"
              filterable
              fit-input-width
              placeholder="Qaysi viloyatdan"
              auto-complete="on"
            >
              <el-option
                v-for="location in locations"
                :key="location.id"
                :label="location.name"
                :value="location.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="custom-col">
          <el-form-item label="Qaysi tumandan" prop="from_district_id">
            <el-select
              v-model="cargoForm.from_district_id"
              filterable
              fit-input-width
              placeholder="Qaysi tumandan"
              auto-complete="on"
            >
              <el-option
                v-for="district in getDistricts(cargoForm.from_region_id)"
                :key="district.id"
                :label="district.name"
                :value="district.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="Qaysi manzildan" prop="from_address">
            <el-input
              placeholder="Qaysi Manzildan"
              v-model="cargoForm.from_address"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" class="custom-col">
          <el-form-item label="Qaysi viloyatdan" prop="to_region_id">
            <el-select
              v-model="cargoForm.to_region_id"
              filterable
              fit-input-width
              placeholder="Qaysi viloyatga"
              auto-complete="on"
            >
              <el-option
                v-for="location in locations"
                :key="location.id"
                :label="location.name"
                :value="location.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="custom-col">
          <el-form-item label="Qaysi tumanga" prop="to_district_id">
            <el-select
              v-model="cargoForm.to_district_id"
              filterable
              fit-input-width
              placeholder="Qaysi tumandan"
              auto-complete="on"
            >
              <el-option
                v-for="district in getDistricts(cargoForm.to_region_id)"
                :key="district.id"
                :label="district.name"
                :value="district.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="Admin" class="custom-col" prop="creator_id">
            <el-input
              placeholder="Admin"
              :value="`${user.name} ${user.email}`"
              @focus="userDialog = true"
            >
              <el-button
                slot="append"
                class="el-input__icon el-icon-search"
                @click="userDialog = true"
              ></el-button>
            </el-input>
            <select-user
              :userDialog="userDialog"
              @click-user="ClickUser($event, 'cargoForm')"
            ></select-user>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="Muammo" prop="matter">
            <el-input
              placeholder="Muammo"
              v-model="cargoForm.matter"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="success" @click="createCargo()">Saqlash</el-button>
      <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
    </el-form>
  </el-main>
</template>

<script>
import { locationMixin } from "@/mixins/locationMixin";
import { userSelectMixin } from "@/mixins/userSelectMixin";
import SelectUser from "@/components/transports/SelectUser.vue";
import { getErrorMessage } from "@/utils/error-message";
import { cargoValidMixin } from "./mixin/cargoValidMixin";
export default {
  components: { SelectUser },
  data: () => ({
    cargoForm: {
      from_region_id: undefined,
      from_district_id: undefined,
      from_address: "",
      to_region_id: undefined,
      to_district_id: undefined,
      creator_id: undefined,
      matter: "",
    },
  }),
  mixins: [locationMixin, userSelectMixin, cargoValidMixin],
  methods: {
    createCargo() {
      this.$refs.cargoForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("cargo/createCargo", this.cargoForm)
            .then(() => {
              this.$router.go(-1);
              this.$message({
                showClose: true,
                message: "Yangi yuk muvaffaqiyatli qo'shildi!!!",
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
      });
    },
  },
};
</script>