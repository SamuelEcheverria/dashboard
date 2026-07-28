import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { LineChart } from '@mui/x-charts/LineChart'
import type { OpenMeteoResponse } from '../types/DashboardsTypes'

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  Guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  Quito: { latitude: -0.1807, longitude: -78.4678 },
  Manta: { latitude: -0.9621, longitude: -80.7127 },
  Cuenca: { latitude: -2.9001, longitude: -79.0046 }
}

interface ChartUIProps {
  selectedOption: string | null
}

export default function ChartUI({ selectedOption }: ChartUIProps) {
  const [data, setData] = useState<OpenMeteoResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const cityConfig = selectedOption != null ? CITY_COORDS[selectedOption] : CITY_COORDS.Guayaquil
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(URL)
        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }

        const json = await response.json()
        if (isMounted) {
          setData(json as OpenMeteoResponse)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'No se pudieron cargar los datos')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void fetchData()

    return () => {
      isMounted = false
    }
  }, [selectedOption])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 240 }}>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (!data?.hourly) {
    return <Alert severity="info">No hay datos disponibles</Alert>
  }

  const labels = data.hourly.time.slice(0, 7)
  const values1 = data.hourly.temperature_2m.slice(0, 7)
  const values2 = data.hourly.wind_speed_10m.slice(0, 7)

  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura por hora
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: values1, label: 'Temperatura' },
          { data: values2, label: 'Viento' }
        ]}
        xAxis={[{ scaleType: 'point', data: labels }]}
      />
    </>
  )
}
