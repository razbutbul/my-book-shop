const express = require("express");
const logger = require("./logger");

const app = express();
const PORT = 3000;

app.use(express.json());

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("BookShop server side");
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
