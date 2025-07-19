document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("btn");
  const info = document.getElementById("info");
  const cityname = document.getElementById("city-name");
  const temp = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errormsg = document.getElementById("error-msg");
  const API_KEY = "49dd7aad671fb508ae0ae78c75d42c57";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    // learnt that APi request may show some error and server is always in other continent

    try {
      const weatherdata = await fetchweatherdata(city);
      displayweatherdata(weatherdata);
    } catch (error) {
      showError();
    }
  });
  async function fetchweatherdata(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }
  function displayweatherdata(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityname.textContent = name;
    temp.textContent = `Temperature :${main.temp}`;
    description.textContent = `Weather : ${weather[0].description}`;

    //UNLOCK THE DISPLAY
    info.classList.remove("hidden");
    errormsg.classList.add("hidden");
  }
  function showError() {
    info.classList.add("hidden");
    errormsg.classList.remove("hidden");
  }
});
