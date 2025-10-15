require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const routeurl = require("./routes/url");
const staticroute = require("./routes/staticroute");
const userroute = require("./routes/user");
const URL = require("./models/url");
const { connectmongoose } = require("./connect");
const { restricttologgedinuseronly } = require("./middlewares/auth");

const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectmongoose(process.env.mongo_url).then(() => {
  console.log("✅ MongoDB connected successfully");
});

app.use("/", staticroute);
app.use("/url", restricttologgedinuseronly, routeurl);
app.use("/user", userroute);

app.get("/:shortid", async (req, res) => {
  const shortID = req.params.shortid;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortid: shortID },
      { $push: { visithistory: { timestamp: Date.now() } } },
      { new: true }
    );
    if (!entry) return res.status(404).send("Short URL not found");

    let redirectUrl = entry.redirecturl;
    if (!/^https?:\/\//i.test(redirectUrl)) {
      redirectUrl = "https://" + redirectUrl;
    }

    return res.redirect(redirectUrl);
  } catch (err) {
    console.error("Error during redirect:", err);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
