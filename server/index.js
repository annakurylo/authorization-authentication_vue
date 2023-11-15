const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const PORT = 5001;
// const Role = require("./models/Role");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);


mongoose.set("strictQuery", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://annakurylo:1124@cluster0.yvaxat9.mongodb.net/?retryWrites=true&w=majority`,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

// const role = new Role({value: "Admin"});
// role.save();
