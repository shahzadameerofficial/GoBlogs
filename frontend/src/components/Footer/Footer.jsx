import { Box, Divider } from "@mui/joy"

function Footer() {
  return (
        // <Typography ></Typography>
        <footer>
          <Divider />
          <Box textAlign='center' variant="soft" color='primary' py={2} fontSize={14}>GoBlog is a Web App for Blogging, developed by Shahzad Ameer</Box>
        </footer>
  )
}

export default Footer