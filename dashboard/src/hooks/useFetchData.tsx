import { useEffect, useState } from 'react'
import type { OpenMeteoResponse } from '../types/DashboardsTypes'

const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=relative_humidity_2m,temperature_2m,apparent_temperature,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago'

export default function useFetchData(): OpenMeteoResponse | null {
  const [data, setData] = useState<OpenMeteoResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL)
        const json = await response.json()
        setData(json as OpenMeteoResponse)
      } catch (error) {
        console.error('Error fetching Open-Meteo data:', error)
      }
    }

    fetchData()
  }, [])

  return data
}
