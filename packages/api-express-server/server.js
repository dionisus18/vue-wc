const express = require("express");
const cors = require("cors");
const { sse } = require("@toverux/expresse");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3011;
const translations = {
  titleText: "Welcome to your Home v2sds",
  titleTextAbout: "Welcome to About Page 6",
  titleTextManual: "Welcome to Manual test asdasdasdad",
  viewDesc:
    "View in which you can test the use of swr to load translations and manage their cache and reactivity in vue",
  btnLoadText: "load translation",
  listText: "list of translations ssssssssssss12312",
  emptyText: "empty",
  titleNotPresend: "title not present or not exist",
  readmore:
    "lorem100, ipsum dolor sit amet consectetur adipisicing elit. Iusto, atque beatae. Maxime aperiam nobis accusamus vel eaque adipisci, alias est quam id! Ratione iusto sunt dolores non aspernatur commodi voluptates repellendus quasi, eius pariatur inventore sapiente iste consequuntur animi, aliquam quam earum repudiandae quis? Exercitationem eius, dolore nostrum a eum dolor ipsum fugit saepe quas officia repellat nisi consectetur in ad ea maxime iusto deleniti dolores quaerat voluptas. Alias assumenda veritatis inventore aliquam maxime sunt ex aut animi velit, minima voluptate molestias, facere quod excepturi ipsum aperiam nihil perspiciatis, placeat neque? Quis sed ipsa similique molestiae debitis. Ut, ex suscipit.",
};
// enpoints
// app.get("/translations", (req, res) => {
//   return res.json(translations);
// });
app.get("/translations/:textIndex", (req, res) => {
  return req.params?.textIndex + Math.random();
  return req.params?.textIndex
    ? res.json(translations[req.params.textIndex])
    : res.status(400).send({
        message: "Missing textIndex",
        data: req.params,
      });
});
app.get("/translation", (req, res) => {
  console.log(req.query);
  return res.json(req.query?.textIndex + " hola");
  return req.query?.textIndex
    ? res.json(translations[req.query.textIndex])
    : res.status(400).send({
        message: "Missing textIndex",
        data: req.query,
      });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
