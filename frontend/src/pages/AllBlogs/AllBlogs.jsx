import { Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../../utils/api";
import BlogsContainer from "../../components/BlogsContainer/BlogsContainer";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/appSlice";
function AllBlogs() {
  const [Blogs, setBlogs] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    (async function getAllBlogsApiCall() {
      dispatch(setLoading(true))
      const response = await getAllBlogs();
      if (response.status === 200) {
        const { blogs } = response.data
        setBlogs(blogs);
        dispatch(setLoading(false))
      }
    })();

    return () => {
      setBlogs([]);
    }
  }, []);
  return (
    <>
        <Typography level="h4" textAlign='center' mt={1}>Browse Latest Blogs</Typography>
        <BlogsContainer blogs={Blogs}/>
    </>
  );
}

export default AllBlogs;
