<template>
  <div>
    <div class="file-input">
      <input type="file" ref="imageInput" @change="onChange($event)" />
    </div>
    <el-button @click="openFile">{{label}}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Rasmni tanlang"
    }
  },
  methods: {
    openFile() {
      console.log(this.$refs.imageInput);
      this.$refs.imageInput.click();
    },
    onChange(e) {
      this.$emit("returnImage", e.target.files[0]);
    },
  },
};
</script>

<style scoped>
.file-input {
  display: none;
}
</style>