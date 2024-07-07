let state = reactive({
  selectedCity: "N/A",
  weather: {
    temperature: "N/A",
    humidity: "N/A",
    description: "",
  },
});

const mockWeatherData = {
  "New York": {
    temperature: "15°C",
    humidity: "55%",
    description: "Cloudy",
  },
  London: {
    temperature: "10°C",
    humidity: "75%",
    description: "Rainy",
  },
  Tokyo: {
    temperature: "22°C",
    humidity: "65%",
    description: "Sunny",
  },
  Sydney: {
    temperature: "25°C",
    humidity: "60%",
    description: "Sunny",
  },
};

function fetchWeather(city) {
  setTimeout(() => {
    const weather = mockWeatherData[city];
    state.weather = weather;
    console.log(weather);
  }, 500);
}

function renderApp() {
  console.log("re-rendering...");
  render(
    "#container",
    `<select onChange="updateSelectedCity(this.value);renderApp()">
       <option value="" hidden selected>Select a city</option>
      <option ${
        state.selectedCity === "Tokyo" ? "selected" : ""
      } value="Tokyo"> Tokyo</option>
      <option ${
        state.selectedCity === "London" ? "selected" : ""
      } value="London"> London</option>
      <option ${
        state.selectedCity === "New York" ? "selected" : ""
      } value="New York"> New York</option>
      <option ${
        state.selectedCity === "Sydney" ? "selected" : ""
      } value="Sydney"> Sydney</option>
    </select>
    <div>
      <p>Temperature: ${state.weather.temperature}</p>
      <p>Humidity: ${state.weather.humidity}</p>
      <p>Description: ${state.weather.description}</p>
    </div>`
  );
}

function updateSelectedCity(city) {
  state.selectedCity = city;
  fetchWeather(city);
}

createEffect(function () {
  fetchWeather(state.selectedCity);
});

renderApp();
