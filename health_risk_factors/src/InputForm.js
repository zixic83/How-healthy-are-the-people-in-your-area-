import React, { useEffect, useState,useContext } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  makeStyles
} from "@material-ui/core";
import rawData from "../src/data/alcohol_drug_phn.json";
import { InputContext } from "./InputContext";
import Grid from "@material-ui/core/Grid";
//https://stackoverflow.com/questions/56120213/set-material-ui-select-width
// https://stackoverflow.com/questions/68740329/my-mui-select-component-doesnt-display-placeholder-or-label-props
// https://colorswall.com/palette/24/

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

export default function InputForm() {
  const classes = useStyles();
  // pass user input to App
  const { getArea, getIsSelected } = useContext(InputContext);
  const [area, setArea] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);


  // sort area labels 
  let areaLabels = rawData.features.map((item) => {
    return item.properties.phn_name;
  });
  
  areaLabels.sort();

    const handleSubmit = () => {
      getArea(area)
      if (area !== '') {
        getIsSelected(true)
        
      } else {
        //setIsDisabled(true)
        alert('Please enter an value')
      }
      
    }

    const handleSelect = (e) => {
        setArea(e.target.value)
        
    };


  return (
    <Grid container justifyContent="center">
      <FormControl style={{ minWidth: 500, margin: 20 }}>
        <InputLabel>Area</InputLabel>
        <Select autoWidth variant="outlined" onChange={handleSelect}>
          {areaLabels.map((label) => {
            return (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          type="submit"
          color="secondary"
          variant="outlined"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={classes.button}
          style={{
            marginTop: 10,
            backgroundColor: "#e0e0e0",
            color: "black",
            borderColor: "#9e9e9e",
          }}
        >
          Submit
        </Button>
      </FormControl>
    </Grid>
  );
}
