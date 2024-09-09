'use client'
import Image from 'next/image'
import * as React from 'react'
import { RiCelsiusFill } from 'react-icons/ri'
interface IWeatherForecastProps {
  currentWeather: IWeatherData[] | []
}
const WeatherForecast: React.FC<IWeatherForecastProps> = ({
  currentWeather,
}) => {
  const [cityOrder, setCityOrder] = React.useState(0)

  React.useEffect(() => {
    if (currentWeather && currentWeather.length > 0) {
      const interval = setInterval(() => {
        setCityOrder((prev) =>
          prev === currentWeather.length - 1 ? 0 : prev + 1
        )
      }, 7000)

      return () => clearInterval(interval)
    }
  }, [currentWeather])

  return (
    <div className='flex h-full items-center gap-2 text-sm text-gray-100 font-semibold'>
      <span> {currentWeather[cityOrder]?.city}</span>
      <Image
        src={`https:${currentWeather[cityOrder]?.condition_icon}`}
        alt='Weather Icon'
        width={40}
        height={40}
      />
      <div className='flex gap-1 items-center'>
        {currentWeather[cityOrder]?.temperature_c} <RiCelsiusFill />
      </div>
    </div>
  )
}

export default WeatherForecast
