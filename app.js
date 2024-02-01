const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "API working successfully" });
});

app.post("/getWeather", async (req, res) => {
  const { cities } = req.body;

  let responses = [];

  cities.forEach((city) => {
    const response = axios.get(
      "https://open-weather13.p.rapidapi.com/city/" + city,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
        },
      }
    );
    responses.push(response);
  });

  responses = await Promise.all(responses);
  const weatherArray = responses.map((index) => {
    return index.data.main.temp;
  });

  let weatherData = {};
  for (let i = 0; i < cities.length; i++) {
    weatherData[cities[i]] = Math.round(((weatherArray[i] - 32) * 5) / 9) + "C";
  }

  return res.json(weatherData);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
