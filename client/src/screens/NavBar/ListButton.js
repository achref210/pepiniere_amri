import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { GiPlantSeed, GiFruitTree } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";

const data = [
  { icon: <GiPlantSeed />, label: "Seeds" },
  { icon: <FaSeedling />, label: "Sapling" },
  { icon: <GiFruitTree />, label: "Tree" },
];

export default function ListButton() {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <Paper elevation={0} sx={{ maxWidth: 256 }}>
        <Box
          sx={{
            bgcolor: open ? "rgba(46, 125, 50, 0.2)" : null,
            pb: open ? 2 : 0,
          }}
        >
          <ListItemButton
            alignItems="flex-start"
            onClick={() => setOpen(!open)}
            sx={{
              px: 3,
              pt: 2.5,
              pb: open ? 0 : 2.5,
              "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
            }}
          >
            <ListItemText
              primary="Products"
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              sx={{ my: 0 }}
            />
            k
          </ListItemButton>
          {open &&
            data.map((item) => (
              <ListItemButton
                key={item.label}
                sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                />
              </ListItemButton>
            ))}
        </Box>
      </Paper>
    </Box>
  );
}
