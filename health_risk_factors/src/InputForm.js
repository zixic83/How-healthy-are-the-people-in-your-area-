import React, { useState, useContext } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import rawData from "../src/data/alcohol_drug_phn.json";
import { InputContext } from "./InputContext";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
  button: {
    textTransform: "none",
    marginTop: 10,
  },
  /* https://stackoverflow.com/questions/51387085/change-color-of-select-components-border-and-arrow-icon-material-ui */
  select: {
    "&:before": {
      borderColor: "#9a8c98",
    },
    "&:after": {
      borderColor: "#9a8c98",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "#9a8c98",
    },
  },
});

export default function InputForm() {
  const classes = useStyles();
  // pass user input to App.js
  const { getArea, getIsSelected } = useContext(InputContext);
  const [area, setArea] = useState("");

  // sort area labels
  let areaLabels = rawData.features.map((item) => {
    return item.properties.phn_name;
  });

  areaLabels.sort();

  // handle user input
  const handleSubmit = () => {
    getArea(area);
    getIsSelected(true);
  };

  const handleSelect = (e) => {
    setArea(e.target.value);
  };

  return (
    <Grid container justifyContent="center">
      //
      {/* https://stackoverflow.com/questions/56120213/set-material-ui-select-width */}
      <FormControl style={{ minWidth: 400, margin: 20 }}>
        {/* https://stackoverflow.com/questions/68740329/my-mui-select-component-doesnt-display-placeholder-or-label-props */}
        <InputLabel style={{ color: "#9a8c98" }}>Area</InputLabel>
        <Select className={classes.select} onChange={handleSelect} value={area}>
          {areaLabels.map((label) => {
            return (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
        {/* https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js */}
        <Button
          type="submit"
          variant="outlined"
          onClick={handleSubmit}
          disabled={!area}
          className={classes.button}
        >
          Submit
        </Button>
      </FormControl>
    </Grid>
  );
}
