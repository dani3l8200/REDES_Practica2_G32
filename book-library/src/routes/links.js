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
  req.flash("success", "Book save successfully G32");
  res.redirect("/links");
});

router.get("/", async (req, res) => {
  const books = await pool.query("SELECT * FROM book");
  console.log(books);
  res.render("links/list", { books });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM book where id_book = ?", [id]);
  req.flash("success", "Book delete successfully G32");
  res.redirect("/links");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const books = await pool.query("SELECT * FROM book where id_book = ?", [id]);
  res.render("links/edit", { books: books });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, author } = req.body;
  const newBook = {
    title,
    description,
    author,
  };
  await pool.query("UPDATE book set ? WHERE id_book = ?", [newBook, id]);
  req.flash("success", "Book update successfully G32");
  res.redirect("/links");
});

router.get("/start", (req, res) => {
  res.render("start");
});

module.exports = router;
