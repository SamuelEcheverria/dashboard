import { useState } from 'react'
import './App.css'
import Grid from '@mui/material/Grid'
import AlertUI from './components/AlertUI'
import HeaderUI from './components/HeaderUI'
import SelectorUI from './components/SelectorUI'
import IndicatorUI from './components/IndicatorUI'
import ChartUI from './components/ChartUI'
import TableUI from './components/TableUI'
import useFetchData from './hooks/useFetchData'

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const { data, loading, error } = useFetchData(selectedOption)
  const current = data?.current
  const currentUnits = data?.current_units

  const getIndicatorDescription = (value: number | string | undefined, unit: string | undefined) => {
    if (loading) return 'Cargando...'
    if (error) return `Error: ${error}`
    return `${value ?? 'N/A'} ${unit ?? ''}`.trim()
  }

  return (
    <div className="dashboard-shell">
      <h1 className="dashboard-title">Bienvenido</h1>

      <div className="dashboard-grid">
        <div className="card card--full">
          <HeaderUI />
        </div>
        <div className="card card--full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <AlertUI description="No se preveen lluvias" />
        </div>
        <div className="card card--selector"><SelectorUI onOptionSelect={setSelectedOption} /></div>
        <Grid container size={{ xs: 12, md: 9 }} spacing={2} className="card card--indicators">
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title="Temperatura (2m)"
              description={getIndicatorDescription(current?.temperature_2m, currentUnits?.temperature_2m)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title="Temperatura aparente"
              description={getIndicatorDescription(current?.apparent_temperature, currentUnits?.apparent_temperature)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title="Velocidad del viento"
              description={getIndicatorDescription(current?.wind_speed_10m, currentUnits?.wind_speed_10m)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title="Humedad relativa"
              description={getIndicatorDescription(current?.relative_humidity_2m, currentUnits?.relative_humidity_2m)}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }} className="card card--chart">
          <ChartUI selectedOption={selectedOption} />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }} className="card card--table">
          <TableUI selectedOption={selectedOption} />
        </Grid>
        <div className="card card--full">Elemento: Información adicional</div>
      </div>
    </div>
  )
}

export default App
