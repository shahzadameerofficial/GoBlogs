import { Button, Sheet, Box, Typography, IconButton } from "@mui/joy";
import { NavLink } from "react-router-dom";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { resetUserCredentials } from "../../store/slices/userSlice";
import { requestSignout } from "../../utils/api";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import ColorSchemeToggle from "../Misc/ColorSchemeToggle";
import styles from "./Header.module.css";
import SubMenu from "./SubMenu";

export default function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.user.userCredentials.auth
  );
  const [isWaiting, SetIsWaiting] = useState(false);

  const handleLogout = async () => {
    SetIsWaiting(true);
    const response = await requestSignout();
    if (response) {
      SetIsWaiting(false);
    }
    if (response.status === 200) {
      dispatch(resetUserCredentials());
    }
  };
  return (
    <Sheet
      variant="plain"
      color="neutral"
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        p: 1,
        borderRadius: { xs: 0 },
        minWidth: "min-content",
      }}
    >
      <Box
        sx={{ flex: 1, display: "flex", gap: 1, px: 2, alignItems: "center" }}
      >
        <NavLink to="/" >
          <Typography
            level="title-md"
            fontWeight={600}
            startDecorator={<NewspaperIcon color="primary" />}
            mr={2}
          >
            {" "}
            GoBlogs
          </Typography>
        </NavLink>
        <NavLink to="/" className={styles}>
          Latest Blogs
        </NavLink>
        {isAuthenticated && <NavLink to="/my-blogs">My Blogs</NavLink>}
      </Box>
      <Box sx={{ display: "flex", flexShrink: 0, gap: 2 }}>
        <ColorSchemeToggle sx={{display: {xs: 'inline', sm: 'none'}}}/>
        <SearchBox sx={{ display: { xs: "none", md: "inline-flex" } }}/>
        {isAuthenticated ? (
          // If
          <IconButton
            variant="plain"
            color="danger"
            onClick={handleLogout}
            loading={isWaiting}
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            <LogoutIcon />
          </IconButton>
        ) : (
          // Else
          <NavLink to="/login">
            <Button
              startDecorator={<LoginIcon />}
              variant="soft"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              Login
            </Button>
          </NavLink>
        )}
      </Box>
      <SubMenu onLogoutOut={handleLogout}/>
    </Sheet>
  );
}
