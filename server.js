const express = require("express");
const app = express();
const ejs = require("ejs");
const port = 3000;

app.use(express.static('extension/public'));
app.set("views", "extension/public/views");
app.engine("html", require("ejs").renderFile);

// let pageUrls = ["card", "subject", "note", "view"];
// pageUrls.forEach((url)=>{
//     app.get("/pages/"+url, (req, res)=>{
//         console.log("ree");
//         res.render("pages/"+url+".html");
//     });
// });

// let popupUrls = ["onboarding", "todos"];
// popupUrls.forEach((url)=>{
//     app.get("/popups/"+url, (req, res)=>{
//         res.render("popups/"+url+".html");
//     });
// });

// let componentsUrls = ["Timer", "NoteEditor"];
// componentsUrls.forEach((url)=>{
//     app.get("/components/"+url, (req, res)=>{
//         res.render("Component_Test/"+url+".html");
//     });
// });

app.listen(port, ()=>{
    console.log("started on port", port);
});