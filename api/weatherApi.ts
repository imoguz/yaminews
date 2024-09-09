export default async function weatherApi(): Promise<IWeatherData[]> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  const cities = ['London', 'Paris', 'Berlin', 'Tokyo', 'Ankara', 'washington']
  const data: IWeatherData[] = []

  try {
    for (const city of cities) {
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(
          `Error fetching data for ${city}: ${response.statusText}`
        )
      }

      const weatherData = await response.json()

      const weatherInfo: IWeatherData = {
        city: weatherData.location.name,
        country: weatherData.location.country,
        local_time: weatherData.location.localtime,
        temperature_c: weatherData.current.temp_c,
        temperature_f: weatherData.current.temp_f,
        condition_text: weatherData.current.condition.text,
        condition_icon: weatherData.current.condition.icon,
        wind_kph: weatherData.current.wind_kph,
        humidity: weatherData.current.humidity,
        feelslike_c: weatherData.current.feelslike_c,
        feelslike_f: weatherData.current.feelslike_f,
        last_updated: weatherData.current.last_updated,
      }

      data.push(weatherInfo)
    }

    return data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
