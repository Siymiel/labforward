const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather_form')
const locationInput = document.querySelector('#location')
const startDateInput = document.querySelector('#startDate')
const toDateInput = document.querySelector('#toDate')
// const process = require('dotenv').config();

// Fetch weather data from API
const fetchWeather = async (date, lastdate, location) => {

    // GeoCode location
    const geoCodeApiKey = '2d806a6c0c92849419a0505ee64e74aa'   // N/B: Create account on api.positionstack to acquire API_KEY
    const geoCodeUrl = `http://api.positionstack.com/v1/forward?access_key=${geoCodeApiKey}&query=${location}`
    const response = await fetch(geoCodeUrl)
    const localeData = await response.json()
    // Take the first element in array (localeData) - assummed to be the most accurate
    const singleData = localeData.data[0]

    // Get lat and lon
    const lat = singleData.latitude
    const lon = singleData.longitude

    const url = `/party_plan?lat=${lat}&lon=${lon}&date=${date}&last_date=${lastdate}`
    const res = await fetch(url)
    const weatherConditions = await res.json()
    const { weather } = weatherConditions

    // Filter data according optimal weather conditions given
     function checkOptimalWeather(data) {
        return (data.wind_speed < 30 && data.temperature > 20 && data.temperature < 30 && data.sunshine >= 0 && data.precipitation == 0 )
    }
    const filteredData = weather.filter(checkOptimalWeather)
 
    addWeatherToDom(filteredData)
}

const addWeatherToDom = data => {
    // console.log('Data', data);
    let output = ""
    let location = ""
    let date = ""

    if(data.length) {
        data.map((element) => {
            date = new Date(element.timestamp).toLocaleDateString("en-US")
            output +=`
                 <div class="grid grid-cols-2 border border-gray-300 rounded-md p-4">
                    <div class="font-medium text-base">
                        <h3><span class="text-gray-600 text-sm">Chosen Location:</span> ${locationInput.value}</h3>
                        <p><span class="text-gray-600 text-sm">Optimal Date:</span>  ${date}</p>
                    </div>
                    <div>
                        <h4 class="text-sm font-medium">Weather condition:</h4>
                        <ul class="text-xs font-normal">
                            <li>Wind speed: ${element.wind_speed}</li>
                            <li>Temperature:  ${element.temperature}</li>
                            <li>Sunshine: maximal</li>
                            <li>Precipitation: minimal</li>
                        </ul>
                    </div>
                </div>
            `
        })
    }else {
        output += `
            <p>No Results</p>
        `
    }
    weatherDisplay.innerHTML = output
    locationInput.value = ''
    startDateInput.value = ''
    toDateInput.value = ''
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(locationInput.value === '') {
        alert('Please enter location')
    }else if(startDateInput.value === '') {
        alert('Please enter start date')
    }else if(toDateInput.value === '') {
        elert('Please enter last date')
    } else {
        fetchWeather(startDateInput.value, toDateInput.value, locationInput.value)
    }
})

