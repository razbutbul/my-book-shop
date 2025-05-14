const express = require("express");
const logger = require("./logger");

const app = express();
const PORT = 3000;

app.use(express.json());

const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("BookShop server side");
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
