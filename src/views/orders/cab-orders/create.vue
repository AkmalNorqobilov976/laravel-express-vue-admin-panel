<template>
  <el-main>
    <el-form
      ref="cabOrderForm"
      :model="cabOrderForm"
      :rules="cabOrderRule"
      label-position="top"
    >
      <el-row>
        <el-col :span="8" class="custom-col">
          <el-form-item label="Qaysi viloyatdan" prop="from_region_id">
            <el-select
              v-model="cabOrderForm.from_region_id"
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
              v-model="cabOrderForm.from_district_id"
              filterable
              fit-input-width
              placeholder="Qaysi tumandan"
              auto-complete="on"
            >
              <el-option
                v-for="district in getDistricts(cabOrderForm.from_region_id)"
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
              v-model="cabOrderForm.from_address"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8" class="custom-col">
          <el-form-item label="Qaysi viloyatga" prop="to_region_id">
            <el-select
              v-model="cabOrderForm.to_region_id"
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
              v-model="cabOrderForm.to_district_id"
              filterable
              fit-input-width
              placeholder="Qaysi tumanga"
              auto-complete="on"
            >
              <el-option
                v-for="district in getDistricts(cabOrderForm.to_region_id)"
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
              v-model="cabOrderForm.to_address"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="Seat count" class="custom-col" prop="seat_count">
            <el-input
              placeholder="Seat Count"
              v-model="cabOrderForm.seat_count"
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
              @click-user="ClickUser($event, 'cabOrderForm')"
            ></select-user>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="Narxi" class="custom-col" prop="cost">
            <el-input
              placeholder="Narxi"
              v-model="cabOrderForm.cost"
              type="number"
            />
          </el-form-item>
        </el-col>

        <!-- <el-col :span="8">
          <el-form-item label="Haydovchi" class="custom-col" prop="driver_id">
            <el-input
              placeholder="Haydovchi"
              :value="`${driver.name} ${driver.email}`"
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
        </el-col> -->
      </el-row>
      <el-button type="success" @click="createCabOrder()">Saqlash</el-button>
      <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
    </el-form>
  </el-main>
</template>

<script>
import { locationMixin } from "@/mixins/locationMixin";
import SelectUser from "@/components/transports/SelectUser.vue";
import { userSelectMixin } from "@/mixins/userSelectMixin";
import { getErrorMessage } from "@/utils/error-message";
import { validCabOrderMixin } from "./mixin/validCabOrderMixin";
export default {
  components: { SelectUser },
  data: () => ({
    driverDialog: false,
    driver: {
      id: "",
      name: "",
      email: "",
    },
    cabOrderForm: {
      from_region_id: undefined,
      from_district_id: undefined,
      from_address: "",
      to_region_id: undefined,
      to_district_id: undefined,
      to_address: "",
      seat_count: undefined,
      driver_id: undefined,
      creator_id: undefined,
      cost: undefined,
    },
  }),
  mixins: [locationMixin, userSelectMixin, validCabOrderMixin],
  methods: {
    createCabOrder() {
      this.$refs.cabOrderForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("cab-order/createCabOrder", this.cabOrderForm)
            .then(() => {
              this.$router.go(-1);
              this.$message({
                showClose: true,
                message: "Muvaffaqiyatli qo'shildi!!!",
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
    ClickDriver($event) {
      console.log($event, "click driver");
      this.driver = $event;
      this.cabOrderForm.driver_id = $event.id;

      this.driverDialog = false;
    },
  },
};
</script>