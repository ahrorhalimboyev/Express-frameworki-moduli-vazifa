const express = require("express");
const fs = require("fs");
const path = require("path");

const store = require("./store/store");
store.createStore();
const bookRoutes = require("./routes/books");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
