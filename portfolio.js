import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { activeTab: "home" });
});

app.get("/aboutme", (req, res) => {
  res.render("aboutme", { activeTab: "aboutme" });
});

app.get("/work", (req, res) => {
  res.render("work", { activeTab: "work" });
});

app.get("/resume", (req, res) => {
  res.render("resume", { activeTab: "resume" });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
