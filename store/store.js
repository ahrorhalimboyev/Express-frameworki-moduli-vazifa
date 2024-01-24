// store/store.js

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "books.json");

function createStore() {
  const bookData = [
    {
      id: 1,
      title: "Odam bo'lish qiyin",
      author: "O'tkir Hoshimov",
    },
    {
      id: 2,
      title: "Sariq devni minib",
      author: "Xudoyberdi To'xtaboyev",
    },
  ];

  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify(bookData, null, 2));
  }
}

module.exports = {
  createStore,
  dataPath,
};
