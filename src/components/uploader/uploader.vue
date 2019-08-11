<template>
  <div class="container" @drop="drop" @dragover.prevent></div>
</template>

<script>
import fileUtils from './fileUtils';

export default {
  name: 'Uploader',
  methods: {
    async drop(e) {
      const { items } = e.dataTransfer;
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const entry = item.webkitGetAsEntry();
        // eslint-disable-next-line no-await-in-loop
        const results = await fileUtils.getFiles(entry);
        console.log(results);
      }
    },
  },
};
</script>

<style>
.container {
  height: 300px;
  border: 1px dashed #ccc;
}
</style>
