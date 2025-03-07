import React, { useState } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";
import ForumIcon from "@mui/icons-material/Forum";
import MapIcon from "@mui/icons-material/Map";
import AppsIcon from "@mui/icons-material/Apps";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Box } from "@mui/system";
import NightShelterIcon from '@mui/icons-material/NightShelter';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        width: isOpen ? "180px" : "70px",
        background: "#1b1b2f",
        height: "100vh",
        position: "fixed",
        transition: "width 0.3s",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
        paddingTop: "20px",
        overflow: "hidden"
      }}
    >
      <IconButton 
        onClick={toggleSidebar} 
        style={{ color: "#fff", alignSelf: "center", cursor: "pointer" }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      <List>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon style={{ color: "#ff4081" }}>
              <DashboardIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Dashboard" style={{ fontSize: "0.9rem" }} />}
          </ListItem>
        </Link>

        <Link to="/Data" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon style={{ color: "#ff9100" }}>
              <BarChartIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Data" style={{ fontSize: "0.9rem" }} />}
          </ListItem>
        </Link>

        <Link to="/Site" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon style={{ color: "#00e676" }}>
              <NightShelterIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Site" style={{ fontSize: "0.9rem" }} />}
          </ListItem>
        </Link>

        <Link to="/Carte" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon style={{ color: "#2979ff" }}>
              <MapIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Carte" style={{ fontSize: "0.9rem" }} />}
          </ListItem>
        </Link>

        <Link to="/email" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon style={{ color: "#d500f9" }}>
              <EmailIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Email" style={{ fontSize: "0.9rem" }} />}
          </ListItem>
        </Link>

        <Link to="/settings" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon style={{ color: "#ff1744" }}>
              <SettingsIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Settings" style={{ fontSize: "0.9rem" }} />}
          </ListItem>
        </Link>
      </List>

      <Box sx={{ flexGrow: 1 }} />
    </div>
  );
};

export default Sidebar;