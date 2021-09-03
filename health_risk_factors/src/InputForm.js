import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl,Button } from "@material-ui/core";
import daily_smoker_data from "./data/daily_smoker.json";
//https://stackoverflow.com/questions/56120213/set-material-ui-select-width

export default function InputForm() {
  const areaLabels = daily_smoker_data.features.map((item) => {
    return item.properties.phn_name;
  });
    
    const [userInput, setUserInput] = useState('');
    const handleSubmit = (e) => {
        
        
    }

    const handleSelect = (e) => {
        setUserInput(e.target.value)
        
    };

    useEffect(() => {
        console.log(userInput);
    })


  return (
    <div>
      <FormControl style={{ minWidth: 200 }}>
        <Select
          autoWidth
          variant="outlined"
          onChange={handleSelect}
          defaultValue=""
        >
          {areaLabels.map((label) => {
              return <MenuItem key={label}value={label}>{label}</MenuItem>;
          })}
        </Select>
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </div>
  );
}
