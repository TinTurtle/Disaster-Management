const express = require("express");
const app = express();
const port = 3000;
const client = require("./db/conn.js");
const cors = require("cors");
const morgan = require("morgan");
app.use(cors());
app.use(morgan());

client.connect(()=>{console.log("connected")})

app.post("api/auth/register", async (req, res, next) => {
  try {
    const {email,password} = req.body
    
    if(email == "" || email == null || password == "" || password == null) return res.status(401).json({ status: failed, message: "invalid credentials" });
    


  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: failed, message: "error in reg" });
  }
});

app.listen(port || 4040, () => {
  console.log(`Example app listening on port ${port}`);
});
{
  /*
  register
  login
  getBlogs
  createBlog
  getDonation
  updateBlogDonation
  getIncidents
*/
}
