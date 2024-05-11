/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import { Button, DialogTitle, Divider, Typography } from "@mui/joy";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/icons-material/Menu";
import SearchBox from "../SearchBox/SearchBox";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login, Logout, PersonAdd } from "@mui/icons-material";
import DescriptionIcon from '@mui/icons-material/Description';
import ContactPageIcon from '@mui/icons-material/ContactPage';

export default function SubMenu({ onLogoutOut }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.user.userCredentials);

  const handleNavigation = (route) => {
    navigate(route);
    setOpen(false);
  };
  return (
    <React.Fragment>
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "inline-flex", md: "none" } }}
      >
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)} size="sm">
        <Box p={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              justifyContent: "space-between",
              mb: 1
            }}
          >
            <DialogTitle>Menu</DialogTitle>
            <ModalClose id="close-icon" sx={{ position: "initial" }} />
          </Box>
          <SearchBox onComplete={()=> setOpen(false)}/>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <Typography level="title-md" textAlign='center'>
              Pages
            </Typography>
            <Divider sx={{my: 1}}/>
            <Button
              variant="plain"
              color="neutral"
              startDecorator={<ContactPageIcon/>}
              sx={{ cursor: "pointer", userSelect: "none", justifyContent: 'flex-start' }}
              onClick={() => handleNavigation("/")}
            >
              Latest Blogs
            </Button>
            <Button
              variant="plain"
              color="neutral"
              startDecorator={<DescriptionIcon />}
              sx={{ cursor: "pointer", userSelect: "none", justifyContent: 'flex-start' }}
              onClick={() => handleNavigation("/my-blogs")}
            >
              My Blogs
            </Button>

            {auth ? (
              <Button
                variant="plain"
                color="neutral"
                startDecorator={<Logout/>}
                sx={{ cursor: "pointer", userSelect: "none", justifyContent: 'flex-start' }}
                onClick={() => onLogoutOut() && setOpen(false)}
              >
                Logout
              </Button>
            ) : (
              [<Button
                variant="plain"
                color="neutral"
                key='login'
                startDecorator={<Login/>}
                sx={{ cursor: "pointer", userSelect: "none", justifyContent: 'flex-start' }}
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>,
              <Button
              variant="plain"
              color="neutral"
              key='signup'
              startDecorator={<PersonAdd />}
              sx={{ cursor: "pointer", userSelect: "none", justifyContent: 'flex-start' }}
              onClick={() => handleNavigation("/signup")}
            >
              Signup
            </Button>]
            )}
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
