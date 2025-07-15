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

app.get("/skillset", (req, res) => {
  res.render("skillset", { activeTab: "skillset" });
});

app.get("/project", (req, res) => {
  res.render("project", { activeTab: "project" });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
