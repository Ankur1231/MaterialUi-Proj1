import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  Tabs,
  Tab,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

//components
import Logo from "./Logo";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  themeMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  tabsContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: 50,
    margin: "0 25px 0 50px",
    height: 45,
  },
  logoButton: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = useState(window.location.pathname);

  const handelChange = (e, value) => {
    setValue(value);
  };

  console.log(window.location.pathname);

  return (
    <>
      <ElevationScroll>
        <AppBar color="primary" position="fixed">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to={"/"}
              className={classes.logoButton}
              disableTouchRipple
              onClick={() => setValue("/")}
            >
              {" "}
              <Logo />
            </Button>
            <Tabs
              value={value}
              onChange={handelChange}
              className={classes.tabsContainer}
              TabIndicatorProps={{ style: { backgroundColor: "#FFFFFF" } }}
            >
              <Tab
                className={classes.tab}
                component={Link}
                to={"/"}
                label="Home"
                value="/"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to={"/services"}
                label="Services"
                value="/services"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to={"/revolution"}
                label="The Revolution"
                value="/revolution"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to={"/about"}
                label="About Us"
                value="/about"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to={"/contact"}
                label="Contact Us"
                value="/contact"
              />
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.themeMargin} />
    </>
  );
};

export default Header;
