const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 3000;
const client = require("./db/conn.js");
const cors = require("cors");
const JWT_SECRET = "bg-chutiya";

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/register", async (req, res) => {
  try {
    const { email, username, password, phone } = req.body;
    console.log(req.body);

    if (!email || !username || !password || !phone) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const result = await client.query(
      "INSERT into users (user_name, password, user_email, user_mobile) values($1, $2, $3, $4);",
      [username, password, email, phone]
    );
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
    const result = await client.query(
      "SELECT * FROM users WHERE user_email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length === 1) {
      const token = jwt.sign({ email }, JWT_SECRET);
      return res.status(200).json({ token });
    }
    res.status(402).json({ message: "Invalid credentials!!" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/blog", async (req, res) => {
  try {
    const result = await client.query("SELECT * from incident");
    res.json({ data: result.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/blogbyid/:id", async (req, res) => {
  try {
    const result = await client.query(
      `SELECT * from incident where incident_id = ${req.params.id}`
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/blog", async (req, res) => {
  // {
  //   a: req.body.title,
  //   b: req.body.location,
  //   c: req.body.severity,
  //   d: res.body.description,
  //   e: req.body.post,
  // }
  try {
    console.log(req.body);
    const result = await client.query(
      "INSERT INTO incident (title, location, severity, description, post) VALUES ($1,$2,$3,$4, $5)",
      [
        req.body.title,
        req.body.location,
        req.body.severity,
        req.body.description, // Fixed typo here
        req.body.post.replace(/<p>/g, "").replace(/<\/p>/g, ""),
      ]
    );
    res.json({ message: "Added new blog", desc: result.rowCount });
  } catch (error) {
    console.error("Error adding new blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/donations", async (req, res) => {
  try {
    const result = await client.query("Select * from resource");
    res.json({ message: "Donations retrieved", data: result.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/donationUpdate/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    let { donationAmount , resourcePerson } = req.body;
    if(!resourcePerson) resourcePerson = "Anonymous"  

    const query = `
        UPDATE incident 
        SET donations = donations + $1
        where incident_id = $2;
    `;
    const query2 = `
      insert into resource (quantity, resource_type, incident_id, res_loc) values($1 , 'Financial' , $2, 'Online')
    `;
    const values = [donationAmount, blogId];

    await client.query(query, values);
    await client.query(query2, [donationAmount , blogId ]);

    res.status(200).json({ message: "Donation updated successfully" });
  } catch (error) {
    console.error("Error updating donation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
