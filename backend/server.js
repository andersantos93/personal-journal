const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Signup route
app.post("/signup", (req, res) => {
  const { fullName, email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }
  const newUser = { fullName, email, password, profilePic: "" };
  users.push(newUser);
  res.json({ message: "User registered" });
});

// Login route
app.post("/login", (req, res) => {
  const user = users.find((u) => u.email === req.body.email && u.password === req.body.password);
  if (user) {
    res.json({ token: "fake-jwt-token", user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Update profile picture
app.post("/upload", upload.single("profilePic"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // Find user and update profile picture
  const user = users.find((u) => u.email === req.body.email);
  if (user) {
    user.profilePic = `/uploads/${req.file.filename}`;
    return res.json({ url: user.profilePic });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

app.use("/uploads", express.static("uploads")); 

app.listen(5000, () => console.log("Server running on port 5000"));
