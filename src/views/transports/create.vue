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
      <el-tabs type="border-card">
        <el-tab-pane label="Asosiy ma'lumotlar">
          <el-row>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Holati">
                <el-select
                  class="w-full"
                  v-model="transportForm.status"
                  filterable
                  fit-input-width
                  placeholder="Holati"
                  auto-complete="on"
                >
                  <el-option label="Aktiv" value="Aktiv"> </el-option>
                  <el-option label="Bajarilgan" value="Bajarilgan"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Transport turi">
                <el-select
                  class="w-full"
                  filterable
                  placeholder="Transport turi"
                  fit-input-width
                  v-model="transportForm.transport_type"
                >
                  <el-option label="Taxida" value="by_car"></el-option>
                  <el-option label="Piyoda" value="on_foot"></el-option>
                  <el-option label="Yuk mashinada" value="by_truck"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Narxi" prop="cost">
                <el-input
                  placeholder="Narxi"
                  v-model="transportForm.cost"
                  type="number"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item label="Narx turi">
                <el-select
                  class="w-full"
                  filterable
                  placeholder="Narx turi"
                  fit-input-width
                  v-model="transportForm.cost_type"
                >
                  <el-option
                    label="Kelishiladi"
                    value="Kelishiladi"
                  ></el-option>
                  <el-option label="KM bay" value="km_bay"></el-option>
                  <el-option label="Kun bay" value="kun_bay"></el-option>
                  <el-option label="Soat bay" value="soat_bay"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item label="Izoh" prop="note">
                <el-input placeholder="Izoh" v-model="transportForm.note" />
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item label="Suratlar">
                <image-button
                  :multi="true"
                  :label="
                    transportForm.transport_images.length
                      ? 'Rasm tanlang'
                      : 'Rasm tanlandi'
                  "
                  @returnImage="getImages"
                ></image-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Manzil ma'lumotlar">
          <el-col :span="8" class="custom-col">
            <el-form-item label="Qaysi viloyatdan" prop="from_region_id">
              <el-select
                v-model="transportForm.from_region_id"
                class="w-full"
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
                class="w-full"
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
                v-model="transportForm.to_district_id"
                filterable
                fit-input-width
                class="w-full"
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
        </el-tab-pane>
        <el-tab-pane label="Mijoz ma'lumotlar">
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
        </el-tab-pane>
      </el-tabs>

      <div class="mt-2">
        <el-button type="success" @click="createTransport()">Saqlash</el-button>
        <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
      </div>
      
    </el-form>
  </el-main>
</template>

<script>
import { getErrorMessage } from "@/utils/error-message";
import { validMixinTransport } from "./mixins/validMixin";
import SelectUser from "@/components/transports/SelectUser.vue";
import ImageButton from "@/components/Form/imageButton.vue";
export default {
  components: { SelectUser, ImageButton },
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
      cost_type: "",
      creator_id: "1",
      status: "",
      transport_images: [],
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
    getImages(e){
      console.log(e);
      this.transportForm.transport_images = e;
    } 
  },
  beforeMount() {
    this.getLocations();
  },
};
</script>

<style scoped>
</style>