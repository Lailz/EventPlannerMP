const express = require("express");
const db = require("./db/models");
const eventRoutes = require("./routes/events");
const app = express();

// Middleware
app.use(express.json());
app.use("/events", eventRoutes);

// db.sequelize.sync();
db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

app.listen(8000, () =>
  console.log("The application is running on localhost:8000")
);
