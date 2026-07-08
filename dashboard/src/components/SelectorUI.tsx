import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function SelectorUI() {
    const [cityInput, setCityInput] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCityInput(event.target.value);
    };
                <Select
    return (
        <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
                    value={cityInput}
                    onChange={handleChange}>
                    <MenuItem disabled value=""><em>Seleccione una ciudad</em></MenuItem>
         id="city-simple-select"
         label="Ciudad"
         onChange={handleChange}>
         <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
         <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
         <MenuItem value={"quito"}>Quito</MenuItem>

            {cityInput && (
                <p>
                    Información del clima en <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{cityInput}</span>
                </p>
            )}
}