const express = require("express");
const app = express();
const port = 3001;
const Routes = require("./routes");
const path = require("path");

//initializing processes
// require("./database");
// require("./worker")();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Multi DB GUI");
});

app.use("/api", Routes);

if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname, "client", "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Multi DB listening on port ${port}`);
});
