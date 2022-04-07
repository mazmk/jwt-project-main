const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Successfully Connected to database");
    })
    .catch((error) => {
      console.log("Error Connecting to database", error);
    });
}
module.exports = { connect };
