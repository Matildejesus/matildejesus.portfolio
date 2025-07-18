import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get(["*.js.br", "*.wasm.br", "*.data.br"], (req, res) => {
    const filePath = path.join(__dirname, 'public', req.path);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Not found');
    }

    // Set appropriate headers based on file type
    if (req.path.endsWith('.js.br')) {
        res.set('Content-Type', 'application/javascript');
    } else if (req.path.endsWith('.wasm.br')) {
        res.set('Content-Type', 'application/wasm');
    } else if (req.path.endsWith('.data.br')) {
        res.set('Content-Type', 'application/octet-stream');
    }
    
    res.set('Content-Encoding', 'br');
    res.sendFile(filePath);
});

// Serve other static files
app.use(express.static("public"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
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