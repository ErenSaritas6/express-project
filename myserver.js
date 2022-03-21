const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/contact", function (req, res) {
    res.send("Contact me!");
});

app.get("/about", function (req, res) {
    res.send("It is just me here!");
});

app.get("/hobbies", function (req, res) {
    res.send("<ul><li>coffee</li><li>book</li></ul>");
});

//---------------------------------

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let result = num1 + num2;
    res.send("The result: " + result);
});

//-----bmi--------------------------------

app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);

    let bmi = weight / (height * height);

    res.send("Your bmi is " + bmi);
});

//-------------weather api------------------

app.get("/weather", function (req, res) {
    res.sendFile(__dirname + "/weather.html");
});

app.post("/weather", function (req, res) {

    const query = req.body.cityName;
    const apiKey = ""; //need to be filled
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + apiKey;

    https.get(url, function (response) {


        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<p>The weather is currently: " + weatherDescription + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();


        });
    });
});

//-----------------------------------------

app.listen(3000, function () {
    console.log("Server started on port 3000");
});