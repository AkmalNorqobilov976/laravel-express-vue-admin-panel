<template>
  <el-main>
    <el-form
      ref="newsForm"
      :model="newsForm"
      :rules="newsRule"
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
      <el-button type="success" @click="createNews()">Qo'shish</el-button>
      <el-button type="danger" @click="$router.go(-1)">Orqaga</el-button>
    </el-form>
  </el-main>
</template>

<script>
import { getErrorMessage } from "@/utils/error-message";
import { validMixinNews } from "./mixin/validMixin";

export default {
  data: () => ({
    newsForm: {
      title: "",
      description: "",
    },
  }),
  mixins: [validMixinNews],
  methods: {
    createNews() {
      this.$refs.newsForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("news/createNew", this.newsForm)
            .then(() => {
              this.$message({
                showClose: true,
                message: "Yangilik muvaffaqiyatli yaratildi!!!",
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
};
</script>