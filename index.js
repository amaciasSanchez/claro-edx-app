const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "/dist/clarodx/"))); // BUT ON PRODUCTION -> nginx
app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "/dist/clarodx/index.html"));
});
app.listen(4001, _ => console.log("Up server listen in port 4001"));
