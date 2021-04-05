const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { title, author, description } = req.body;
  const newBook = {
    title,
    author,
    description,
  };
  await pool.query("INSERT INTO book set ?", [newBook]);

  res.redirect("/links");
});

router.get("/", async (req, res) => {
  const books = await pool.query("SELECT * FROM book");
  console.log(books);
  res.render("links/list", { books });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM book where id_book = ?", { id });
  res.redirect("/links");
});
module.exports = router;
