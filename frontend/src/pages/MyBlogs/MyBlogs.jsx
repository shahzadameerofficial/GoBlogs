/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Profile from "../../components/Profile/Profile";
import { getMyBlogs } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import EditBlog from "../../components/EditBlog/EditBlog";
import BlogsContainer from "../../components/BlogsContainer/BlogsContainer";
import { setLoading } from "../../store/slices/appSlice";
function MyBlogs() {
  const [Blogs, setBlogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { _id } = useSelector((state) => state.user.userCredentials);
  const dispatch = useDispatch()

  const activateModal = (mode) => {
    setOpenModal(mode);
  };
  useEffect(() => {
    (async function getAllBlogsApiCall() {
      dispatch(setLoading(true))
      const response = await getMyBlogs(_id);
      if (response.status === 200) {
        setBlogs(response.data.blogs);
        dispatch(setLoading(false))
      }
    })();

    return () => {
      setBlogs([]);
    };
  }, []);
  return (
    <>
      <Profile
        createBlog={() => activateModal(true)}
        totalBlogs={Blogs.length}
      />
      <EditBlog
        mode="new"
        openModal={openModal}
        onClose={activateModal}
        onComplete={activateModal}
      />
      <BlogsContainer blogs={Blogs} />
      {/* <Grid container sx={{ flexGrow: 1 }} minHeight="100vh" textAlign="center">
        {Blogs.map((blog, index) => (
          <Grid xs={12} sm={6} md={4} key={index} sx={{ p: 1 }}>
            <Blog blog={blog} />
          </Grid>
        ))}
      </Grid> */}
    </>
  );
}

export default MyBlogs;
