import React from "react";
import { Typography, Divider, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  link: {
    color: "#9a8c98",
  },
});

export default function Sources() {
  const classes = useStyles();
  return (
    <Box m={15}>
      <Divider varient="middle" />
      <Typography
        align="center"
        variant="h4"
        style={{ color: "#000", fontFamily: "Book Antiqua" }}
      >
        Sources
      </Typography>
      <ul>
        <li>
          Webpage design inspiration/references:{" "}
          <ul>
            <li>
              <a
                href="https://www.abc.net.au/news/2018-07-09/private-health-insurance-do-i-need-it/9633430"
                className={classes.link}
              >
                Private health insurance: Should you have it, and what are the
                benefits? - ABC News (Australian Broadcasting Corporation)
              </a>
            </li>
            <li>
              <a href="https://www.abc.net.au/news/2017-10-19/you-decide-would-you-remove-these-children/8103416">
                You decide: Would you remove these children from their families?
                - ABC News (Australian Broadcasting Corporation)
              </a>
            </li>
            <li>
              <a href="https://www.abc.net.au/news/2019-05-21/income-calculator-comparison-australia/9301378">
                How does your income compare to everyone else's? - ABC News
                (Australian Broadcasting Corporation)
              </a>
            </li>
          </ul>
        </li>
        <li>
          Dataset for the graph: Government of the Commonwealth of Australia -
          Australian Institute of Health and Welfare, (2017): AIHW - National
          Drug Strategy Household Survey - Tobacco Use, Alcohol Risk and Recent
          Illicit Drug Use (PHN) 2016; accessed from AURIN on 2021-09-16.
        </li>
        <li>
          Definition of a standard drink:{" "}
          <a
            href="https://www.health.gov.au/health-topics/alcohol/about-alcohol/standard-drinks-guide"
            className={classes.link}
          >
            Standard drinks guide | Australian Government Department of Health
          </a>
        </li>
        <li>
          Sources of illustrations:{" "}
          <a
            href="https://icon-icons.com/icon/drink-alcohol-liquor-liquors-beverage/61948"
            className={classes.link}
          >
            wine
          </a>
          ,
          <a
            href="https://icon-icons.com/icon/cigars-cigarettes-smoke/89717"
            className={classes.link}
          >
            cigaratees
          </a>
          ,
          <a
            href="https://icon-icons.com/icon/medicine-medical-remedy-pills-medicines-healthy-healthcare-heal/119502"
            className={classes.link}
          >
            pills
          </a>
          ,
          <a
            href="https://icon-icons.com/icon/health-warning-heart-cardiogram-important-coronavirus/141469"
            className={classes.link}
          >
            icon
          </a>
        </li>
      </ul>
    </Box>
  );
}
