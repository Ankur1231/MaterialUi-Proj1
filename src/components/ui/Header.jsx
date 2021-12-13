import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Tabs,
  Tab,
  makeStyles,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

//components
import Logo from "./Logo";

const menuOptions = [
  {
    name: "Services",
    link: "/services",
  },
  {
    name: "Custom Software Development",
    link: "/customsoftware",
  },
  {
    name: "Mobile App Development",
    link: "/mobileapps",
  },
  {
    name: "Website Development",
    link: "/websites",
  },
];

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
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
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
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 2,
    },
  },
  iconButtonContainer: {
    marginLeft: "auto",
    "&:hover": {
      background: "transparent",
    },
  },
  drawerIcon: {
    fontSize: 50,
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(window.location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log(value);

  useEffect(() => {
    if (
      window.location.pathname === "/customsoftware" ||
      window.location.pathname === "/mobileapps" ||
      window.location.pathname === "websites"
    ) {
      setValue("/services");
    }
  }, []);

  const handelChange = (e, value) => {
    setValue(value);
  };

  const handelClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handelClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handelMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handelChange}
        className={classes.tabsContainer}
        TabIndicatorProps={{ style: { backgroundColor: "#FFFFFF" } }}
      >
        <Tab className={classes.tab} component={Link} to={"/"} label="Home" value="/" />
        <Tab
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          className={classes.tab}
          component={Link}
          to={"/services"}
          label="Services"
          value="/services"
          onMouseOver={(e) => handelClick(e)}
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
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handelClose}
        MenuListProps={{ onMouseLeave: handelClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={index}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(e) => {
              handelMenuItemClick(e, index);
              setValue("/services");
              handelClose();
            }}
            selected={index === selectedIndex && value === "/services"}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        onOpen={() => {
          setOpenDrawer(true);
        }}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.themeMargin} />
        <List disablePadding>
          <ListItem
            divider
            button
            component={Link}
            to={"/"}
            onClick={() => {
              setOpenDrawer(false);
              setValue("/");
            }}
            selected={value === "/"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to={"/services"}
            onClick={() => {
              setOpenDrawer(false);
              setValue("/services");
            }}
            selected={value === "/services"}
          >
            <ListItemText className={classes.drawerItem} divider button disableTypography>
              Services
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to={"/revolution"}
            onClick={() => {
              setOpenDrawer(false);
              setValue("/revolution");
            }}
            selected={value === "/revolution"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Revolution
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to={"/about"}
            onClick={() => {
              setOpenDrawer(false);
              setValue("/about");
            }}
            selected={value === "/about"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              About Us
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to={"/contact"}
            onClick={() => {
              setOpenDrawer(false);
              setValue("/contact");
            }}
            selected={value === "/contact"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Contact Us
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to={"/estimate"}
            onClick={() => {
              setOpenDrawer(false);
              setValue("/estimate");
            }}
            className={classes.drawerItemEstimate}
            selected={value === "/"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.iconButtonContainer}
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar color="primary" position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to={"/"}
              className={classes.logoButton}
              disableTouchRipple
              onClick={() => setValue("/")}
            >
              <Logo />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.themeMargin} />
    </>
  );
};

export default Header;
