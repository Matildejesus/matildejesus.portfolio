import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

var week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = "";
let date = "";
var tasks = [];
var dayTasks = [];

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

function findDate(req, res, next) {
  const d = new Date();
  day = d.getDay();
  date = d.toLocaleDateString();
  next();
}
app.use(findDate);

function getNewTask(req, res, next) {
  if (req.body["newTask"]) {
    tasks.push(req.body["newTask"]);
  }
  next();
}
app.use(getNewTask);

app.get("/dayTask", (req, res) => {
  res.render("daytask.ejs", {
    taskPage: "dayTask",
    dayOfTheWeek: week[day],
    todayDate: date,
    newTask: dayTasks,
  });
});

app.post("/dayTask", (req, res) => {
  for (const task of tasks) {
    dayTasks.push(task);
  }
  res.render("daytask.ejs", {
    taskPage: "dayTask",
    dayOfTheWeek: week[day],
    todayDate: date,
    newTask: dayTasks,
  });
  console.log(dayTasks);
  if (tasks.length == 1) {
    tasks = [];
  }
});

app.post("/clearArray", (req, res) => {
  tasks = [];
  dayTasks = [];
  res.render("daytask.ejs", {
    taskPage: "dayTask",
    dayOfTheWeek: week[day],
    todayDate: date,
    newTask: tasks,
  });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
