import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

export const CategorySelect: React.FC<{
  data: Category[];
  value: string;
  handleInputChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
}> = ({ value, data, handleInputChange }) => (
  <FormControl sx={{ minWidth: "100%" }}>
    <InputLabel id="value-label">Category</InputLabel>
    <Select
      labelId="value-label"
      name="category"
      value={value}
      fullWidth
      variant="outlined"
      onChange={(e: any) => handleInputChange(e)}
    >
      {data.map((cat) => (
        <MenuItem key={cat.label} value={cat.value}>
          {cat.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const FormField: React.FC<{
  label: string;
  name: string;
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, handleInputChange }) => (
  <TextField
    label={label}
    variant="outlined"
    margin="normal"
    fullWidth
    name={name}
    value={value}
    onChange={handleInputChange}
  />
);
