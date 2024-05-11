/* eslint-disable react/no-unescaped-entities */
import { ArrowBack, Home } from "@mui/icons-material";
import { Grid, Typography, Stack, Button, Sheet } from "@mui/joy";
import { NavLink, useNavigate } from "react-router-dom";


function PageNotFound() {
    const navigate = useNavigate()
  return (
    <Grid
      container
      spacing={2}
      sx={{ flexGrow: 1 }}
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Sheet sx={{p: 2}} color="danger">
          <Typography level="h2">404 - Page Not Found</Typography>
          <Typography>
            Unfortunately, The Page you are doesn't exists. Please Try another page
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button startDecorator={<ArrowBack />} onClick={()=> navigate(-1)} color="danger">Go Back</Button>
            <NavLink to="/">
              <Button startDecorator={<Home />} variant="outlined">Go Home</Button>
            </NavLink>
          </Stack>
      </Sheet>
    </Grid>
  );
}

export default PageNotFound;
