/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/joy"
import Blog from "../Blog/Blog"

function BlogsContainer({blogs}) {
  return (
    <Grid
        container
        
      >
        {blogs?.map((blog, index) => (
          <Grid key={index} xs={12} sm={6} md={4} lg={3} sx={{p: 1, display: 'flex', flexDirection: 'column'}}>
            <Blog blog={blog} />
          </Grid>
        ))}
        {blogs?.length === 0
        &&
        <Grid xs={12}>
            <Typography level='title-lg' textAlign='center' my={1}>No Blogs Found!</Typography>
        </Grid>
        }

      </Grid>
  )
}

export default BlogsContainer