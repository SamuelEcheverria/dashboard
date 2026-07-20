import { useEffect, useState } from 'react'
import type { OpenMeteoResponse } from '../types/DashboardsTypes'

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  Guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  Quito: { latitude: -0.1807, longitude: -78.4678 },
  Manta: { latitude: -0.9621, longitude: -80.7127 },
  Cuenca: { latitude: -2.9001, longitude: -79.0046 }
}

export default function useFetchData(selectedOption: string | null): OpenMeteoResponse | null {
  const [data, setData] = useState<OpenMeteoResponse | null>(null)

  useEffect(() => {
    const cityConfig = selectedOption != null ? CITY_COORDS[selectedOption] : CITY_COORDS.Guayaquil
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`

    const fetchData = async () => {
      try {
        const response = await fetch(URL)
        const json = await response.json()
        setData(json as OpenMeteoResponse)
      } catch (error) {
        console.error('Error fetching Open-Meteo data:', error)
      }
    }

    void fetchData()
  }, [selectedOption])

  return data
}
