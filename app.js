const dataBase = require("./config/database");
dataBase.connect();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

// Middlewares
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({ response: "hehe" });
  //   cons;
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).json({ error: "All input is required" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password too Short" });
    }
    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(201).json({ message: "user created" });
  } catch (error) {
    res.status(400).json(error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res
        .status(400)
        .send("Both email and password are required for login");
    }
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = await jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      res.status(200).json({ access_token: token });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.get('/wellcum', auth, (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200).send("<h1>Wellcum User!</h1>")
});

// Logger Function
function logger(r, s, n) {
  let data = `Method: ${r.method}, URL: ${r.originalUrl}`;
  if (r.method === "POST") {
    data = `Method: ${r.method}, URL: ${r.originalUrl}, Body: ${JSON.stringify(
      r.body
    )}`;
  }
  console.log(data);
  n();
}

module.exports = app;
