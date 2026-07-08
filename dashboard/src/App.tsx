import './App.css'
import AlertUI from './components/AlertUI'
import HeaderUI from './components/HeaderUI'
import SelectorUI from './components/SelectorUI'

function App() {
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
        <div className="card card--indicators">Elemento: Indicadores</div>
        <div className="card card--chart">Elemento: Gráfico</div>
        <div className="card card--table">Elemento: Tabla</div>
        <div className="card card--full">Elemento: Información adicional</div>
      </div>
    </div>
  )
}

export default App
