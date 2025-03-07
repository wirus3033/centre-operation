import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Marquee from "react-fast-marquee";

const Topbar = () => {
  // Récupérer la date du jour
  const today = new Date().toLocaleDateString("fr-FR");

  return (
    <AppBar
      position="sticky"
      style={{
        background: "#1b1b2f",
        borderBottom: "1px solid white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Nom de l'application */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ffffff" }}>
          CENTRE OPÉRATIONNELLE BNGRC
        </Typography>

        {/* Section date avec un bandeau animé */}
        <Box
          sx={{
            background: "#0044ff",
            padding: "8px 20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            minWidth: "300px",
            maxWidth: "500px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.5), transparent)",
              animation: "slideAnimation 3s infinite linear",
            }}
          />
          <Marquee gradient={false} speed={50}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#ffffff",
                fontSize: "1.1rem",
                fontStyle: "italic",
                paddingRight: "20px",
              }}
            >
               Point de situation du {today}
            </Typography>
          </Marquee>
        </Box>

        {/* Icônes d'action */}
        <div>
          <IconButton style={{ color: "#ffffff" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton style={{ color: "#ffffff" }}>
            <SettingsIcon />
          </IconButton>
          <IconButton style={{ color: "#ffffff" }}>
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;