const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
app.use(cors());
const path = require("path");
const port = 3000;
var infobj = {
"Author":"Prabin Subedi",
"github_repo":"https://github.com/prabincodes/rashifal-api",



}
app.get("/", (request, response) => {
  response.sendFile(path.resolve("views","index.html"));
});
app.get("/info",(request,response) => {
response.send(infobj);
});



app.get("/:sign",(req,resp) => {
  
var n;
var e = req.params.sign;

switch(e) {
  case "aries":
    n= "mesh";
    break;
  case "taurus":
    n= "brish";
    break;
  case "gemini":
    n = "mithun";
    break;
    case "cancer":
    n= "karkat";
    break;
    case "leo":
    n= "singha";
    break;
    case "virgo":
    n="kanya";
    break;
    case "libra":
    n= "tula";
    break;
case "scorpio":
    n= "brischik";
    break;
case "sagittarius":
    n= "dhanu";
    break;
case "capricorn":
    n= "makar";
    case "aquarius":
    n= "kumbha";
    break;
    case "pisces":
    n= "meen";
    break;

}
console.log(n);



  const url = "https://www.hamropatro.com/rashifal/daily/"+n;
console.log(url);
axios.get(url).then((res) =>{
    
      const $ = cheerio.load(res.data);
        const desc= $(".desc")
          .find("p")
          .text();
        console.log(desc);
const obj = {
"sun_sign":n,
"prediction":desc

}
resp.send(obj);
  
});
});
app.listen(port, () => {
  console.log("App listening at https://rashifal-api.herokuapp.com")
})
