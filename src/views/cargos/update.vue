<template>
  <el-main>
    <el-form
      ref="cargoForm"
      :model="cargoForm"
      :rules="cargoRule"
      label-position="top"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="Holati" prop="status">
            <el-select
              class="w-full"
              v-model="cargoForm.status"
              filterable
              fit-input-width
              placeholder="Holati"
              auto-complete="on"
            >
              <el-option label="Aktiv" value="active"> </el-option>
              <el-option label="Bajarilgan" value="completed"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="Manzil">
          <el-row>
            <el-col :span="8" class="custom-col">
              <el-form-item label="Qaysi viloyatdan" prop="from_region_id">
                <el-select
                  v-model="cargoForm.from_region_id"
                  filterable
                  fit-input-width
                  class="w-full"
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
                  class="w-full"
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
                  class="w-full"
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
                  class="w-full"
                  fit-input-width
                  placeholder="Qaysi tumanga"
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
              <el-form-item label="Qaysi manzilga" prop="to_address">
                <el-input
                  placeholder="Qaysi Manzilga"
                  v-model="cargoForm.to_address"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Mijoz">
          <el-row>
            <el-col :span="12">
              <el-form-item label="Mijoz" class="custom-col" prop="creator_id">
                <el-input
                  placeholder="Mijoz"
                  :value="`${cargoForm.user.name} ${cargoForm.user.email}`"
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
            <el-col :span="12">
              <el-form-item label="Og'irligi(kg)">
                <el-input
                  placeholder="Yuk o'g'irligi"
                  v-model="cargoForm.weight"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Izoh">
                <el-input
                  placeholder="Izoh"
                  v-model="cargoForm.note"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Buyurtma" prop="matter">
                <el-input
                  placeholder="Buyurtma"
                  v-model="cargoForm.matter"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Haydovchi">
          <el-row>
            <el-col :span="8">
              <el-form-item label="Haydovchi" class="custom-col">
                <el-input
                  placeholder="Haydovchi"
                  :value="`${cargoForm.driver.name} ${cargoForm.driver.email}`"
                  @focus="driverDialog = true"
                >
                  <el-button
                    slot="append"
                    class="el-input__icon el-icon-search"
                    @click="driverDialog = true"
                  ></el-button>
                </el-input>
                <select-user
                  :userDialog="driverDialog"
                  @click-user="ClickDriver"
                ></select-user>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div class="mt-2">
        <el-button type="success" @click="updateCargo()">Saqlash</el-button>
        <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
      </div>
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
      driver_id: undefined,
      matter: "",
      creator: {
        id: "",
        name: "",
        email: "",
      },
      driver: {
        id: "",
        name: "",
        email: "",
      },
    },
  }),
  mixins: [locationMixin, userSelectMixin, cargoValidMixin],
  methods: {
    updateCargo() {
      this.$refs.cargoForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("cargo/updateCargo", this.cargoForm)
            .then(() => {
              delete this.cargoForm.creator;
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
    getCargo() {
      this.$store
        .dispatch("cargo/getCargo", this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.cargoForm = response.data;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: getErrorMessage(error),
            type: "error",
          });
        });
    },
    ClickDriver(e) {
      this.driverDialog = false;
      this.driver = e;
      this.cargoForm.driver_id = e.id;
      console.log(e);
    },
  },
  beforeMount() {
    this.getCargo();
  },
};
</script>