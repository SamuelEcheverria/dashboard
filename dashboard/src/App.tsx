import './App.css'
import Grid from '@mui/material/Grid'
import AlertUI from './components/AlertUI'
import HeaderUI from './components/HeaderUI'
import SelectorUI from './components/SelectorUI'
import IndicatorUI from './components/IndicatorUI'
import useFetchData from './hooks/useFetchData'

function App() {
  const dataFetcherOutput = useFetchData()
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
        <div className="card card--selector"><SelectorUI/></div>
        <Grid container size={{ xs: 12, md: 9 }} spacing={2} className="card card--indicators">
          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput && (
              <IndicatorUI
                title="Temperatura (2m)"
                description={`${current?.temperature_2m} ${currentUnits?.temperature_2m}`}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput && (
              <IndicatorUI
                title="Temperatura aparente"
                description={`${current?.apparent_temperature} ${currentUnits?.apparent_temperature}`}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput && (
              <IndicatorUI
                title="Velocidad del viento"
                description={`${current?.wind_speed_10m} ${currentUnits?.wind_speed_10m}`}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput && (
              <IndicatorUI
                title="Humedad relativa"
                description={`${current?.relative_humidity_2m} ${currentUnits?.relative_humidity_2m}`}
              />
            )}
          </Grid>
        </Grid>
        <div className="card card--chart">Elemento: Gráfico</div>
        <div className="card card--table">Elemento: Tabla</div>
        <div className="card card--full">Elemento: Información adicional</div>
      </div>
    </div>
  )
}

export default App
