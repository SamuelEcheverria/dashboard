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
  const dataFetcherOutput = useFetchData(selectedOption)
  const current = dataFetcherOutput?.current
  const currentUnits = dataFetcherOutput?.current_units

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
            {dataFetcherOutput ? (
              <IndicatorUI
                title="Temperatura (2m)"
                description={`${current?.temperature_2m ?? 'N/A'} ${currentUnits?.temperature_2m ?? ''}`.trim()}
              />
            ) : (
              <IndicatorUI title="Temperatura (2m)" description="Cargando..." />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput ? (
              <IndicatorUI
                title="Temperatura aparente"
                description={`${current?.apparent_temperature ?? 'N/A'} ${currentUnits?.apparent_temperature ?? ''}`.trim()}
              />
            ) : (
              <IndicatorUI title="Temperatura aparente" description="Cargando..." />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput ? (
              <IndicatorUI
                title="Velocidad del viento"
                description={`${current?.wind_speed_10m ?? 'N/A'} ${currentUnits?.wind_speed_10m ?? ''}`.trim()}
              />
            ) : (
              <IndicatorUI title="Velocidad del viento" description="Cargando..." />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput ? (
              <IndicatorUI
                title="Humedad relativa"
                description={`${current?.relative_humidity_2m ?? 'N/A'} ${currentUnits?.relative_humidity_2m ?? ''}`.trim()}
              />
            ) : (
              <IndicatorUI title="Humedad relativa" description="Cargando..." />
            )}
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
