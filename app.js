var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

function calculations(params) {
    console.log(params)
    var client_weight = params.weight;
    var client_bodyfat = params.bodyfat;
    console.log(params.weight)
    console.log(params.bodyfat)
    var client_weight_in_lbs = client_weight * 2.20462262185;
    console.log(client_weight_in_lbs)
    maintenance_cal_low_bar = client_weight_in_lbs * 14;
    maintenance_cal_high_bar = client_weight_in_lbs * 16;
}

app.get("/", function (req,res) {
    res.render("index.ejs",{answer : ""});
})

app.post("/result", function (req, res) {
    calculations(req.body)
    res.render("index.ejs", {answer: ""})
})

app.listen(process.env.PORT || 3000, function () {
    console.log("SERVER 3000 HAS STARTED");
});
