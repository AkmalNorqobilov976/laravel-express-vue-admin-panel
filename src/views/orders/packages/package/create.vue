<template>
  <el-main>
    <el-form ref="packageForm" :model="packageForm" label-position="top">
      <el-tabs type="border-card">
        <el-tab-pane label="Asosiy">
          <el-row>
            <el-col :span="8" class="custom-col">
              <el-form-item label="Qaysi viloyatdan" prop="from_region_id">
                <el-select
                  class="w-full"
                  v-model="packageForm.from_region_id"
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
                  class="w-full"
                  v-model="packageForm.from_district_id"
                  filterable
                  fit-input-width
                  placeholder="Qaysi tumandan"
                  auto-complete="on"
                >
                  <el-option
                    v-for="district in getDistricts(packageForm.from_region_id)"
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
                  v-model="packageForm.from_address"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Mijoz ismi">
                <el-input
                  v-model="packageForm.recipient_name"
                  placeholder="Mijoz"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Mijoz raqami">
                <el-input v-model="packageForm.recipient_phone"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item label="Yuboruvchi/do'kon profili">
                <el-input
                  placeholder="Yuboruvchi/do'kon profili"
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
                  @click-user="ClickUser($event, 'packageForm')"
                ></select-user>
              </el-form-item>
            </el-col>

            <!-- not finished input -->
            <!-- <el-col :span="12" class="custom-col">
              <el-form-item label="Yuboruvchi/Do'kon nomi">
                <el-input v-model="packageForm.recipient_name"></el-input>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="12" class="custom-col">
              <el-form-item label="Yuboruvchi/Do'kon raqami">
                <el-input v-model="packageForm.recipient_phone"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="12" class="custom-col">
              <el-form-item label="Yetqazib berish summasi">
                <el-input
                  v-model="packageForm.delivery_fee_amount"
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Qo'shimcha ma'lumotlar">
          <el-row>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Nima olib borish kerak? Hujjat, mahsulot">
                <el-input v-model="packageForm.matter" type="textarea"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item label="Qo'shimcha ma'lumot">
                <el-input type="textarea" v-model="packageForm.note"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Status">
                <el-select
                  class="w-full"
                  v-model="packageForm.status"
                  filterable
                  fit-input-width
                  placeholder="Status"
                  auto-complete="on"
                >
                  <el-option label="new" value="new"></el-option>
                  <el-option label="accepted" value="accepted"></el-option>
                  <el-option label="active" value="active"></el-option>
                  <el-option label="completed" value="completed"></el-option>
                  <el-option label="canceled" value="canceled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Ichiki buyurtma raqami">
                <el-input type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Expired at">
                <el-date-picker type="date" v-model="packageForm.expired_at">
                </el-date-picker>
                <el-time-picker v-model="packageForm.time_expired_at">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Transport turi">
                <el-select class="w-full" v-model="packageForm.vehicle_type">
                  <el-option label="Taxida" value="by_car"></el-option>
                  <el-option label="Piyoda" value="on_foot"></el-option>
                  <el-option label="Yuk mashinada" value="by_truck"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Yuboruvchi/do'kon profili">
                <el-input
                  placeholder="Yuboruvchi/do'kon profili"
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
                  @click-user="ClickDriver($event, 'packageForm')"
                ></select-user>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Skladni tanlang">
                <el-select class="w-full" v-model="packageForm.storage_id">
                  <el-option
                    v-for="storage in storages"
                    :key="storage.id"
                    :label="storage.name"
                    :value="storage.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <!-- to address -->
            <el-col :span="8" class="custom-col">
              <el-form-item label="Qaysi viloyatga" prop="to_region_id">
                <el-select
                  class="w-full"
                  v-model="packageForm.to_region_id"
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
                  class="w-full"
                  v-model="packageForm.to_district_id"
                  filterable
                  fit-input-width
                  placeholder="Qaysi tumanga"
                  auto-complete="on"
                >
                  <el-option
                    v-for="district in getDistricts(packageForm.to_region_id)"
                    :key="district.id"
                    :label="district.name"
                    :value="district.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="custom-col">
              <el-form-item label="Qaysi manzilga" prop="to_address">
                <el-input
                  placeholder="Qaysi Manzilga"
                  v-model="packageForm.to_address"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item label="Mahsulot skladdami?">
                <el-switch v-model="packageForm.in_storage"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Pochtani ilovada chop etmaslik">
                <el-switch v-model="packageForm.is_private"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Kommentlar">Kommentlar</el-tab-pane>
        <el-tab-pane label="Tranzaksiyalar">Tranzaksiyalar</el-tab-pane>
      </el-tabs>
      <div class="mt-2">
        <el-button type="success" @click="createPackage">Saqlash</el-button>
        <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
      </div>
    </el-form>
  </el-main>
</template>

<script>
import { locationMixin } from "@/mixins/locationMixin";
import moment from "moment";
import { userSelectMixin } from "@/mixins/userSelectMixin";
import { getStoragesByPagination } from "@/api/storage";
import SelectUser from "@/components/transports/SelectUser.vue";
import { getErrorMessage } from "@/utils/error-message";
export default {
  components: { SelectUser },
  data: () => ({
    userDialog: false,
    driverDialog: false,
    driver: {
      name: "",
      email: "",
    },
    packageForm: {
      to_region_id: undefined,
      to_district_id: undefined,
      to_address: "",
      recipient_id: undefined,
      recipient_name: "",
      recipient_phone: "+998",

      // qo'shimcha ma'lumotlar

      matter: "",
      note: "",
      expired_at: "",
      time_expired_at: "",
      vehicle_type: "",
      driver_id: "",
      from_region_id: undefined,
      from_district_id: undefined,
      creator_id: "",
      from_address: "",
      storage_id: 1,
      in_storage: false,
      is_private: false,

      // undefined
      // completed_at: "",
      // canceled_at: "",
      // insurance_amount: "",
      // delivery_fee_amount: "",
      // recipient_id: "",
      // package_list_id: "",
      // from_longitude: "",
      // from_latitude: "",
      // fail_reason: "",
      // request_id: "",
      // is_paid: false,
      // cash_amount: "",
      // store_package_list_id: undefined,
      // yuzka_request_id: undefined,
      // is_exchange: false,
      // status_description: ""
    },

    // assistant variables
    storages: [],
  }),
  mixins: [locationMixin, userSelectMixin],

  methods: {
    getStorages() {
      getStoragesByPagination(1)
        .then((response) => {
          console.log(response.data.data);
          this.storages = response.data.data;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: getErrorMessage(error),
            type: "error",
          });
        });
    },

    ClickDriver($event) {
      this.driver = $event;
      this.packageForm.driver_id = $event.id;
      this.driverDialog = false;
    },
    getStoragesByPagination() {
      getStoragesByPagination(1)
        .then((response) => {
          this.storages = response.data.data;
          console.log(this.storages, "storages");
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: getErrorMessage(error),
            type: "error",
          });
        });
    },

    getExpiredAt(date, time) {
      const exdate = new Date(this.packageForm.expired_at);
      const exTime = new Date(this.packageForm.time_expired_at);

      exdate.setHours(exTime.getHours());
      exdate.setMinutes(exTime.getMinutes());
      return moment(exdate).format();
    },

    createPackage() {
      this.$store
        .dispatch("packages/createPackage", {
          ...this.packageForm,
          expired_at: this.getExpiredAt(),
        })
        .then((response) => {
          this.$message({
            showClose: true,
            message: "Muvaffaqiyatli qo'shildi!!!",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            type: true,
            message: getErrorMessage(error),
            type: "error",
          });
        });
    },
  },
  beforeMount() {
    this.getStoragesByPagination();
  },
};
</script>