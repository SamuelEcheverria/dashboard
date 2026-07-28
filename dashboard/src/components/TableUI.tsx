import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type { OpenMeteoResponse } from '../types/DashboardsTypes'

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  Guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  Quito: { latitude: -0.1807, longitude: -78.4678 },
  Manta: { latitude: -0.9621, longitude: -80.7127 },
  Cuenca: { latitude: -2.9001, longitude: -79.0046 }
}

interface TableUIProps {
  selectedOption: string | null
}

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
  return arrLabels.map((label, index) => ({
    id: index,
    label,
    value1: arrValues1[index] ?? 0,
    value2: arrValues2[index] ?? 0
  }))
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'label',
    headerName: 'Hora',
    width: 180
  },
  {
    field: 'value1',
    headerName: 'Temperatura (°C)',
    width: 150
  },
  {
    field: 'value2',
    headerName: 'Viento (km/h)',
    width: 180
  },
  {
    field: 'resumen',
    headerName: 'Resumen',
    description: 'No es posible ordenar u ocultar esta columna.',
    sortable: false,
    hideable: false,
    width: 220,
    valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`
  }
]

export default function TableUI({ selectedOption }: TableUIProps) {
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
      <Box sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (!data?.hourly) {
    return <Alert severity="info">No hay datos disponibles</Alert>
  }

  const rows = combineArrays(
    data.hourly.time.slice(0, 7),
    data.hourly.temperature_2m.slice(0, 7),
    data.hourly.wind_speed_10m.slice(0, 7)
  )

  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
