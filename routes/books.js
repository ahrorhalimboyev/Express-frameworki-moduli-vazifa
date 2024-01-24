const { Router } = require("express");
const fs = require("fs");
const path = require("path");

const books = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "books.json"), "utf8")
);

const router = Router();

router.get("/books", (req, res) => {
  res.send(books);
});

router.get("/books/add", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-book.html"));
});

router.post("/books/added", (req, res) => {
  const Id = books.reduce((max, book) => {
    return Math.max(max, book.id);
  }, 0);
  const newBook = { id: Id + 1, ...req.body };
  const hasBook = books.find((book) => {
    return book.title === req.body.title;
  });
  console.log(hasBook);
  if (hasBook) {
    res.send(`<h1>Book with title "${hasBook.title}" already available</h1>`);
  } else {
    books.push(newBook);
    fs.writeFileSync(
      path.join(__dirname, "..", "books.json"),
      JSON.stringify(books)
    );
    res.send(
      "<h1>Book added successfully</h1><br> <a href='/books'>Homepage</a>"
    );
  }
});

router.post("/books/edited", (req, res) => {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == req.body.id) {
      books[i].title = req.body.title;
      books[i].author = req.body.author;
    }
  }
  fs.writeFileSync(
    path.join(__dirname, "..", "books.json"),
    JSON.stringify(books)
  );
  res.send(
    "<h1>Book edited successfully</h1><br> <a href='/books'>Homepage</a>"
  );
});

router.get("/books/delete/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookToDelete = books.find((book) => book.id === bookId);

  if (!bookToDelete) {
    res.send(`<h1>Book with ID-${bookId} not found</h1>`);
    return;
  } else {
    const leftBooks = books.filter((book) => book.id != bookId);
    fs.writeFileSync(
      path.join(__dirname, "..", "books.json"),
      JSON.stringify(leftBooks)
    );
    res.send(
      "<h1>Book deleted successfully</h1><br> <a href='/books'>Homepage</a>"
    );
  }
});

router.get("/books/edit/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookToEdit = books.find((book) => book.id === bookId);

  if (!bookToEdit) {
    res.send(`<h1>Book with ID-${bookId} not found</h1>`);
    return;
  }
  res.send(`
        <h1>Edit book</h1><br>
        <form action="/books/edited" method="POST">
        <input type="hidden" name="id" value="${bookToEdit.id}">
        <label for="title">Title</label>
        <input type="text" name="title" value="${bookToEdit.title}" />
        <label for="author">Author</label>
        <input type="text" name="author" value="${bookToEdit.author}" />
        <button type="submit">Save</button>
      </form>
  `);
});

router.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);
  if (book) {
    res.send(book);
  } else {
    res.send(`<h1>Book with ID-${bookId} not found</h1>`);
  }
});

module.exports = router;
