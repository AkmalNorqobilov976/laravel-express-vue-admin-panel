<template>
  <div>
    <div class="file-input">
      <input
        v-if="multi"
        type="file"
        ref="imageInput"
        multiple
        @change="onChangeImages($event)"
      />
      <input v-else type="file" ref="imageInput" @change="onChange($event)" />
    </div>
    <el-button @click="openFile">{{ label }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    multi: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Rasmni tanlang",
    },
  },
  methods: {
    openFile() {
      console.log(this.$refs.imageInput);
      this.$refs.imageInput.click();
    },
    onChange(e) {
      this.$emit("returnImage", e.target.files[0]);
    },
    onChangeImages(e) {
      this.$emit("returnImage", e.target.files);
    },
  },
};
</script>

<style scoped>
.file-input {
  display: none;
}
</style>