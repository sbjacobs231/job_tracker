const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "..", "client/build");

require("dotenv").config();

app.use(express.static(publicPath));

app.get("/*", function (req, res) {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express listening on port ${process.env.EXPRESS_PORT}`);
});
