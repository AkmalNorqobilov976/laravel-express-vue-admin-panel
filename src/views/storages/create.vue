<template>
  <el-main>
    <el-form
      ref="storageForm"
      :model="storageForm"
      :rules="storageRules"
      label-position="top"
      auto-complete="on"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="Nomi" prop="name">
            <el-input placeholder="Nomi" v-model="storageForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="Sozlamalar">
          <el-row>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Viloyat" prop="region_id">
                <el-select
                  v-model="storageForm.region_id"
                  filterable
                  fit-input-width
                  class="w-full"
                  placeholder="Viloyat"
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
            <el-col :span="12" class="custom-col">
              <el-form-item label="Tuman" prop="district_id">
                <el-select
                  v-model="storageForm.district_id"
                  filterable
                  fit-input-width
                  placeholder="Tuman"
                  class="w-full"
                >
                  <el-option
                    v-for="location in getDistricts(storageForm.region_id)"
                    :key="location.id"
                    :label="location.name"
                    :value="location.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item label="Xizmat haqqi" prop="service_fee_percent">
                <el-input
                  placeholder="Xizmat haqqi"
                  v-model="storageForm.service_fee_percent"
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item label="Chaqiruv xizmati" prop="call_center">
                <el-input
                  placeholder="Chaqiruv xizmati"
                  v-model="storageForm.call_center"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item>
                <el-switch
                  active-text="Filial pochtalari ilovada chop etilmaydi"
                  v-model="storageForm.is_private_parcels"
                ></el-switch>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item>
                <el-switch
                  active-text="Filial ilova orqali pochta qabul qiladi?"
                  v-model="storageForm.is_can_accept_parcels"
                ></el-switch>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="custom-col">
              <el-form-item>
                <el-switch
                  active-text="Avtomatik tarzda buyurtmalarni yetqazib berildiga otqazish"
                  v-model="storageForm.is_enabled_auto_complete"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="custom-col">
              <el-form-item>
                <el-switch
                  active-text="Avtomatik tarzda yetqazib berish narxini kamaytirish (kuniga 1000)"
                  v-model="storageForm.is_enabled_reduce_delivery_fee"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="logo">
                <image-button
                  @returnImage="getImage"
                  :label="storageForm.logo ? 'Rasm tanlandi' : 'Rasmni tanlang'"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div class="mt-2">
        <el-button type="success" @click="createStorage()">Saqlash</el-button>
        <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
      </div>
    </el-form>
  </el-main>
</template>

<script>
import { getErrorMessage } from "@/utils/error-message";
import { storageValidMixin } from "./mixin/storageValidMixin";
import imageButton from "@/components/Form/imageButton.vue";
export default {
  components: { imageButton },
  data: () => ({
    locations: [],
    storageForm: {
      region_id: undefined,
      district_id: undefined,
      name: "",
      sort_order: false,
      call_center: "",
      is_can_accept_parcels: false,
      service_fee_percent: undefined,
      balance: undefined,

      //
      is_private_parcels: false,
      is_enabled_auto_complete: false,
      is_enabled_reduce_delivery_fee: false,
      logo: null,
    },
  }),
  mixins: [storageValidMixin],
  methods: {
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
    getDistricts(regionId) {
      let districts = this.locations.find(
        (location) => location.id == regionId
      );
      return districts?.districts;
    },

    createStorage() {
      this.$refs.storageForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("storage/createStorage", this.storageForm)
            .then((response) => {
              this.$router.go(-1);
              this.$message({
                showClose: true,
                message: "Yangi obmorxona muvaffaqiyatli qo'shildi!!!",
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
    getImage(e) {
      this.storageForm.logo = e;
      console.log(this.storageForm.logo, "logo");
    },
  },
  beforeMount() {
    this.getLocations();
  },
};
</script>