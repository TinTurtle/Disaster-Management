const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 3000;
const client = require("./db/conn.js");
const cors = require("cors");
const JWT_SECRET = "bg-chutiya"

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World 123!" });
});

app.post("/register", async (req, res) => {
  try {
    const { email, username, password, phone } = req.body;

    if (!email || !username || !password || !phone) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const result = await client.query("INSERT into users (user_name, password, user_email, user_mobile) values($1, $2, $3, $4);", [username, password, email, phone])
    const token = jwt.sign({ email, username }, JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide both email and password" });
    }
    const result = await client.query("SELECT * FROM users WHERE user_name = $1 AND password = $2",[email,password])
    if(result){
      const token = jwt.sign({ email }, JWT_SECRET);
      return res.status(200).json({ token });
    } 
    res.status(402).json({message: "Invalid credentials!!"})
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});//invalid credentials needed

app.get("/blog", async (req, res) => {
  try {
    const result = await client.query("SELECT * from blogs");
    res.json({ data: result.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/blogbyid/:id", async (req, res) => {
  try {
    const result = await client.query(
      `SELECT * from blogs where id = ${req.params.id}`
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/blog", async (req, res) => {
  try {
    console.log(req.body)
    const result = await client.query(
      "INSERT INTO blogs (title, location, severity, description, post) VALUES ($1,$2,$3,$4, $5)",
      [
        req.body.title,
        req.body.location,
        req.body.severity,
        res.body.description,
        req.body.post,
      ]
    );
    res.json({ message: "Added new blog", desc: result.rowCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/donations", async (req, res) => {
  try {
    const res = await client.query("Select * from donations");
    res.json({ message: "Donations retrieved", data: res.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/donationUpdate/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const { newDonationAmount } = req.body;

    const query = `
      UPDATE blogs
      SET donation = $1
      WHERE id = $2
    `;
    const values = [newDonationAmount, blogId];

    const result = await client.query(query, values);

    res.status(200).json({ message: "Donation updated successfully" });
  } catch (error) {
    console.error("Error updating donation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
