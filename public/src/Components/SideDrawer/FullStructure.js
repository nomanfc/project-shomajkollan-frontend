import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { VscArrowLeft } from "react-icons/vsc";
import CorporateFareSharpIcon from '@mui/icons-material/CorporateFareSharp';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';

import { AiFillCaretRight } from "react-icons/ai";

import { SideLinksDash, SideLinksOrg,SideLinksUsers } from "./DrawerItems/drawerItem";
import { SideLinksDown } from "./DrawerItems/drawerItem";
import { FcHome } from "react-icons/fc";

import NavText from "./NavBar";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(0)} + 1px)`,
  },
});


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const mobileView = window.screen.width;
const WindowToggle = mobileView < 768 ? false : true;

var authentication = JSON.parse(localStorage.getItem("profile"));

export default function FullStructure() {
  const theme = useTheme();

  const icon = <AiFillCaretRight />;

  const [open, setOpen] = React.useState(WindowToggle);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [activeIcon, setActiveIcon] = useState(null);


  const load = localStorage.getItem("reload")
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [load]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const userType = authentication.data.type;

  return (
    <div style={{fontFamily: 'Kalpurush'}}>
      <AppBar
        position="fixed"
        open={open}
        style={{
          background: "#6f4283",
          color: "white",
          boxShadow: "2px 2px 2px #F1F1F1",
          height: "65px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <NavText />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} style={{ fontSize: "10px" }}>
        <div
          style={{
            diplay: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#6f4283",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "15px",
              justifyContent: "space-between",
              width: "100%",
              textAlign: "center",
              margin: "auto",
              height: "65px",
            }}
          >
            <div
              style={{
                color: "orange",
                fontSize: "15px",
                margin: "auto",
                color: "white",
              }}
            >
             {/* <h2 style={{ textShadow: '1px 1px 1px green' }}>সমাজ কল্যাণ</h2>  */}
              {/* {userType.toUpperCase()} */}
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <MenuIcon style={{ color: "white" }} />
              )}
            </IconButton>
          </div>
        </div>
        <Divider />

        {SideLinksDash.map((menuItems, index) => (
          <ListItem
            button
            component={NavLink}
            activeStyle={{
              color: "black"
            }}
            key={index}
            to={menuItems.link}
            isActive={(match, location) => {
              match && setActiveIcon(index);
              return match;
            }}
          >
            {activeIcon === index ? (
              <ListItemIcon style={{ fontSize: "25px", color: "purple" }}>
                {icon}
              </ListItemIcon>
            ) : (
              // ""
              <ListItemIcon style={{ fontSize: "25px", fontFamily: 'Kalpurush' }}>
                {menuItems.icon}
              </ListItemIcon>
            )}

            <ListItemText style={{ color: "#099F19", fontSize: "10px", fontFamily: 'Kalpurush'  }}  primary={menuItems.name} />
          </ListItem>
        ))}

        <ListItem>
          <ListItemIcon style={{ fontSize: "25px", color: "#099F19" }}>
            <CorporateFareSharpIcon/>
          </ListItemIcon>
          <ListItemText style={{ color: "gray" , textShadow: "0 1px 1px black" }}>সংস্থা</ListItemText>
        </ListItem>

        {SideLinksOrg.map((menuItems, index) => (
          <ListItem
            button
            component={NavLink}
            activeStyle={{
              color: "black"
            }}
            key={index}
            to={menuItems.link}
            isActive={(match, location) => {
              match && setActiveIcon(index);
              return match;
            }}
            style={{
              marginLeft: "70px",
              fontSize: "10px"
            }}
          >
            <ListItemText style={{ color: "#099F19", fontSize: "10px", fontFamily: 'Kalpurush'  }} primary={"- "+menuItems.name}/>
          </ListItem>
        ))}

        <ListItem>
          <ListItemIcon style={{ fontSize: "25px", color: "#099F19" }}>
            < PeopleSharpIcon/>
          </ListItemIcon>
          <ListItemText style={{ color: "gray", textShadow: "0 1px 1px black",fontFamily: 'Kalpurush'  }}>ব্যবহারকারী</ListItemText>
        </ListItem>

        {SideLinksUsers.map((menuItems, index) => (
          <ListItem
            button
            component={NavLink}
            activeStyle={{
              color: "black"
            }}
            key={index}
            to={menuItems.link}
            isActive={(match, location) => {
              match && setActiveIcon(index);
              return match;
            }}
            style={{
              marginLeft: "70px",
            }}
          >
            <ListItemText style={{ fontSize: "25px", color: "#099F19",fontFamily: 'Kalpurush'  }} primary={"- "+menuItems.name} />
          </ListItem>
        ))}

        <Divider />
        <List>
          {SideLinksDown.map((menuDown, index) => (
            <ListItem
              button
              component="a"
              key={index}
              href={menuDown.link}
              style={{ fontSize: "20px" }}
            >
              <ListItemIcon>{menuDown.icon}</ListItemIcon>
              <ListItemText primary={menuDown.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
