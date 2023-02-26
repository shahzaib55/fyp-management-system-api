require("dotenv/config");
const app = require("./app");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
