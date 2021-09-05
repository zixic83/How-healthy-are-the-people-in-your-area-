import React, { useEffect, useState,useContext } from "react";
import { Select, MenuItem, FormControl,Button } from "@material-ui/core";
import daily_smoker_data from "./data/daily_smoker.json";
import { InputContext } from "./InputContext";
//https://stackoverflow.com/questions/56120213/set-material-ui-select-width

export default function InputForm() {
  const areaLabels = daily_smoker_data.features.map((item) => {
    return item.properties.phn_name;
  });
    
  const [area, setArea] = useState('');
  
  // pass user input to App
  const {getArea} = useContext(InputContext);
  

    const handleSubmit = (e) => {
      getArea(area)  
        
    }

    const handleSelect = (e) => {
        setArea(e.target.value)
        
    };


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
      {}
    </div>
  );
}
