import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("*.js.br", (req, res, next) => {
    res.set("Content-Encoding", "br");
    res.set("Content-Type", "application/javascript");
    next();
});

app.get("*.wasm.br", (req, res, next) => {
    res.set("Content-Encoding", "br");
    res.set("Content-Type", "application/wasm");
    next();
});

app.get("*.data.br", (req, res, next) => {
    res.set("Content-Encoding", "br");
    res.set("Content-Type", "application/octet-stream");
    next();
});

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
