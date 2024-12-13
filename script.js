// API key (This should ideally be stored securely in a backend server for security reasons)
const apiKey = "e09213d4129689ccdea1bfa4d99da806";

// Base URL for the OpenWeatherMap API
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Get references to HTML elements (input box, button, weather icon, and error message elements)
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather__icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");
const weatherDescriptionLabel = document.querySelector(".weather__description"); // New label for weather description

// Function to fetch and display weather data for a given city
async function checkWeather(city) {
    try {
        // Make an API request to fetch weather data
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        
        // Check if the response indicates a city not found
        if (response.status === 404) {
            // Show the error message and hide the weather information
            errorElement.style.display = "block";
            weatherElement.style.display = "none";
        } else {
            // Parse the JSON response
            const data = await response.json();
            
            // Update the weather information on the page
            document.querySelector(".city").innerHTML = data.name; // City name
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Temperature
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Humidity
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; // Wind speed

            // Update the weather icon and description based on the weather condition
            let description = "Unknown weather condition.";
            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
                description = "It's cloudy today.";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
                description = "The sky is clear.";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
                description = "It's raining. Don't forget your umbrella!";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
                description = "Light rain outside.";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist.png";
                description = "There's mist in the air.";
            } else if (data.weather[0].main === "Snow") {
                weatherIcon.src = "images/snow.png";
                description = "It's snowing. Stay warm!";
            } else if (data.weather[0].main === "Thunderstorm") {
                weatherIcon.src = "images/thunderstorm.png";
                description = "Thunderstorms are occurring.";
            } else if (data.weather[0].main === "Fog") {
                weatherIcon.src = "images/fog.png";
                description = "Foggy conditions outside.";
            } else if (data.weather[0].main === "Haze") {
                weatherIcon.src = "images/haze.png";
                description = "The air is hazy.";
            } else if (data.weather[0].main === "Tornado") {
                weatherIcon.src = "images/tornado.png";
                description = "Tornado warning in effect!";
            } else if (data.weather[0].main === "Ash") {
                weatherIcon.src = "images/ash.png";
                description = "Volcanic ash in the air.";
            } else {
                weatherIcon.src = "images/default.png"; // Default icon for unhandled weather conditions
                description = "Weather condition not recognized.";
            }

            // Update the weather description label
            weatherDescriptionLabel.innerHTML = description;

            // Show the weather information and hide the error message
            weatherElement.style.display = "block";
            errorElement.style.display = "none";
        }
    } catch (error) {
        // Handle any unexpected errors (e.g., network issues)
        console.error("Error fetching weather data:", error);
        alert("An unexpected error occurred. Please try again later.");
    }
}

// Add an event listener to the search button
searchBtn.addEventListener("click", () => {
    // Get the city name from the input box
    const city = searchBox.value.trim(); // Trim whitespace for cleaner input

    // Check if a city name was entered
    if (city) {
        checkWeather(city); // Call the function to fetch weather data
        searchBox.value = ""; // Clear the search box
    } else {
        alert("Please enter a city name"); // Show an alert if the input is empty
    }
});

// Add an event listener to the input box for the "Enter" key
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") { // Check if the pressed key is "Enter"
        const city = searchBox.value.trim(); // Trim whitespace for cleaner input

        // Check if a city name was entered
        if (city) {
            checkWeather(city); // Call the function to fetch weather data
            searchBox.value = ""; // Clear the search box
        } else {
            alert("Please enter a city name"); // Show an alert if the input is empty
        }
    }
});
