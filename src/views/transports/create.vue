<template>
  <el-main>
    <el-form
      class="transportForm"
      ref="createTransportForm"
      :model="transportForm"
      :rules="transportRules"
      label-position="top"
      auto-complete="on"
    >
      <el-row>
        <el-col :span="8" class="custom-col">
          <el-form-item label="Qaysi viloyatdan" prop="from_region_id">
            <el-select
              v-model="transportForm.from_region_id"
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
              v-model="transportForm.from_district_id"
              filterable
              fit-input-width
              placeholder="Qaysi tumandan"
              auto-complete="on"
            >
              <el-option
                v-for="district in getDistricts(transportForm.from_region_id)"
                :key="district.id"
                :label="district.name"
                :value="district.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="Qaysi manzildan"
            class="custom-col"
            prop="from_address"
          >
            <el-input
              placeholder="Qaysi manzildan"
              v-model="transportForm.from_address"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8" class="custom-col">
          <el-form-item label="Qaysi viloyatga" prop="to_region_id">
            <el-select
              v-model="transportForm.to_region_id"
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
              v-model="transportForm.to_district_id"
              filterable
              fit-input-width
              placeholder="Qaysi tumanga"
              auto-complete="on"
            >
              <el-option
                v-for="district in getDistricts(transportForm.to_region_id)"
                :key="district.id"
                :label="district.name"
                :value="district.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="Qaysi manzilga"
            class="custom-col"
            prop="to_address"
          >
            <el-input
              placeholder="Qaysi manzilga"
              v-model="transportForm.to_address"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8" class="custom-col">
          <el-form-item label="Eslatma" prop="note">
            <el-input placeholder="Eslatma" v-model="transportForm.note" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="custom-col">
          <el-form-item label="Narxi" prop="cost">
            <el-input
              placeholder="Narxi"
              v-model="transportForm.cost"
              type="number"
            />
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
              @click-user="ClickUser"
            ></select-user>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="success" @click="createTransport()">Saqlash</el-button>
      <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
    </el-form>
  </el-main>
</template>

<script>
import { getErrorMessage } from "@/utils/error-message";
import { validMixinTransport } from "./mixins/validMixin";
import SelectUser from "@/components/transports/SelectUser.vue";
export default {
  components: { SelectUser },
  data: () => ({
    user: {
      id: undefined,
      name: "",
      email: "",
    },
    userDialog: false,
    locations: [],
    transportForm: {
      from_region_id: undefined,
      from_district_id: undefined,
      from_address: "",
      to_region_id: undefined,
      to_district_id: undefined,
      to_address: "",
      note: "",
      cost: undefined,
      creator_id: undefined,
    },
  }),
  mixins: [validMixinTransport],
  methods: {
    ClickUser($event) {
      this.transportForm.creator_id = $event.id;
      this.userDialog = false;
      this.user = $event;
    },
    getDistricts(regionId) {
      let districts = this.locations.find(
        (location) => location.id == regionId
      );
      return districts?.districts;
    },
    getLocations() {
      this.$store
        .dispatch("region/getLocations")
        .then((response) => {
          this.locations = response.data;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: getErrorMessage(error),
            type: "error",
          });
        });
    },
    createTransport() {
      this.$refs.createTransportForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("transport/createTransport", this.transportForm)
            .then(() => {
              this.$message({
                showClose: true,
                message: "Transport muvaffaqiyatli yaratildi!!!",
                type: "success",
              });
              this.$router.go(-1);
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
  beforeMount() {
    this.getLocations();
  },
};
</script>

<style scoped>
</style>