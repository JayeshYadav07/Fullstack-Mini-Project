const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { UserRouter } = require("./routes/User.routes");
const { notesRouter } = require("./routes/Notes.routes");
const { authenticate } = require("./middlewares/Authenticate.middleware");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", UserRouter);
app.use(authenticate);
app.use("/notes", notesRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log({ msg: "Connection failed", error: error.message });
  }

  console.log("Listening on PORT " + process.env.PORT);
});
