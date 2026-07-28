import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface SelectorProps {
  onOptionSelect: (option: string) => void
}

export default function SelectorUI({ onOptionSelect }: SelectorProps) {
  const [cityInput, setCityInput] = useState('')

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value
    setCityInput(selectedValue)
    onOptionSelect(selectedValue)
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="city-select-label">Ciudad</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-simple-select"
          label="Ciudad"
          value={cityInput}
          onChange={handleChange}
        >
          <MenuItem value=""><em>Seleccione una ciudad</em></MenuItem>
          <MenuItem value="Guayaquil">Guayaquil</MenuItem>
          <MenuItem value="Quito">Quito</MenuItem>
          <MenuItem value="Manta">Manta</MenuItem>
          <MenuItem value="Cuenca">Cuenca</MenuItem>
        </Select>
      </FormControl>

      {cityInput && (
        <p>
          Información del clima en <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{cityInput}</span>
        </p>
      )}
    </div>
  )
}
