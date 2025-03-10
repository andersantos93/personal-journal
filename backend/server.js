const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

app.post("/signup", (req, res) => {
  users.push(req.body);
  res.json({ message: "User registered" });
});

app.post("/login", (req, res) => {
  const user = users.find((u) => u.email === req.body.email && u.password === req.body.password);
  if (user) {
    res.json({ token: "fake-jwt-token" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
