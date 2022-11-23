<template>
  <el-main>
    <el-form
      ref="newsForm"
      :rules="newsRule"
      :model="newsForm"
      auto-complete="on"
    >
      <el-form-item label="Sarlavha" prop="title">
        <el-input placeholder="Sarlavha" v-model="newsForm.title" />
      </el-form-item>

      <el-form-item label="Tavsif" prop="description">
        <el-input
          placeholder="Tavsif"
          type="textarea"
          v-model="newsForm.description"
        />
      </el-form-item>
      <el-form-item label="Rasm">
        <image-button @returnImage="getImage" />
      </el-form-item>
      <el-button type="success" @click="updateNews()">Yangilash</el-button>
      <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
    </el-form>
  </el-main>
</template>

<script>
import { getErrorMessage } from "@/utils/error-message";
import { validMixinNews } from "./mixin/validMixin";
import imageButton from '@/components/Form/imageButton.vue';
export default {
  components: { imageButton },
  data: () => ({
    newsForm: {
      title: "",
      description: "",
    },
  }),
  mixins: [validMixinNews],
  methods: {
    updateNews() {
      this.$refs.newsForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("news/updateNew", this.newsForm)
            .then(() => {
              this.$message({
                showClose: true,
                message: "Yangilik muvaffaqiyatli yangilandi!!!",
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
    getNew() {
      this.$store
        .dispatch("news/getNew", this.$route.params.id)
        .then((response) => {
          this.newsForm = response.data;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: getErrorMessage(error),
            type: "error",
          });
        });
    },
    getImage(e) {
      this.newsForm.image = e;
    },
  },
  beforeMount() {
    this.getNew();
  },
};
</script>