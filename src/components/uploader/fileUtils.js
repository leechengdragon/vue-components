export default {
  fileHandler(item) {
    return new Promise((res) => {
      item.file((file) => {
        res(file);
      });
    });
  },
  folderHandler(item) {
    return new Promise((res) => {
      const reader = item.createReader();
      reader.readEntries((entries) => {
        res(entries);
      });
    });
  },
  async iterFileTree(entries, cb, tmp) {
    const result = tmp || [];
    let folderCount = 0;
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      if (entry.isFile) {
        // eslint-disable-next-line no-await-in-loop
        const file = await this.fileHandler(entry);
        result.push(file);
      } else if (entry.isDirectory) {
        folderCount += 1;
        // eslint-disable-next-line no-await-in-loop
        const nextEntries = await this.folderHandler(entry);
        this.iterFileTree(nextEntries, cb, result);
      }
    }
    if (folderCount === 0) {
      cb(result);
    }
  },
  getFiles(entry) {
    if (!entry) {
      return null;
    }

    return new Promise((res) => {
      this.iterFileTree([entry], (result) => {
        res(result);
      });
    });
  },
};
