const shortId = require("shortid");
const URL = require("../models/url");

async function handlegeneratenewshorturl(req, res) {
  try {
    console.log("Request body:", req.body);

    const body = req.body;
    if (!body.URL) return res.status(400).json({ error: "URL is required" });

    let finalURL = body.URL.trim();
    if (!/^https?:\/\//i.test(finalURL)) {
      finalURL = "https://" + finalURL;
    }

    const shortID = shortId.generate();

    await URL.create({
      shortid: shortID,
      redirecturl: finalURL,
      visithistory: [],
    });

    return res.render("home", {
      id: shortID,
      success: true,
    });
  } catch (err) {
    console.error("Error generating short URL:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { handlegeneratenewshorturl };
