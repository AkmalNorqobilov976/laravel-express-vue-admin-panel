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
    <div class="image-viewer mt-2" ref="imageButtonImageViewer">
      <span v-for="(image, i) in imageList" class="custom-col" :key="i">
        <img :src="image" height="60" alt="" />
      </span>
      <div v-if="!isImageSelected">
        <span v-for="(image, i) in imageUrls" class="custom-col" :key="i">
          <img v-if="image" :src="image" height="60" />
        </span>
      </div>
    </div>
    <el-button @click="openFile">{{ label }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    imageUrls: {},
    multi: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Rasmni tanlang",
    },
  },
  data: () => {
    return {
      isImageSelected: false,
      imageList: [],
    };
  },
  methods: {
    openFile() {
      this.$refs.imageInput.click();
    },
    checkIsImageSelected(e) {
      if (e.target.files.length) {
        this.isImageSelected = true;
      } else {
        this.isImageSelected = false;
      }
    },
    fileReader(files) {
      this.imageList = [];
      for (const file of files) {
        this.imageList.push(URL.createObjectURL(file));
      }
    },
    onChange(e) {
      this.checkIsImageSelected(e);
      this.fileReader(e.target.files);
      this.$emit("returnImage", e.target.files[0]);
    },
    onChangeImages(e) {
      this.checkIsImageSelected(e);
      this.this.$emit("returnImage", e.target.files);
    },
  },
};
</script>

<style scoped>
.file-input {
  display: none;
}
</style>