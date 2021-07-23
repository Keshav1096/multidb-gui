const express = require("express");
const app = express();
const port = 3001;
const Routes = require("./routes");

//initializing processes
// require("./database");
// require("./worker")();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Multi DB GUI");
});

app.use("/api", Routes);

app.listen(port, () => {
  console.log(`Multi DB listening on port ${port}`);
});
