/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  deleteBlog,
  deleteComment,
  getBlogById,
  getBlogComments,
  updateComment,
} from "../../utils/api";

import {
  Typography,
  Dropdown,
  AspectRatio,
  Card,
  MenuButton,
  MenuItem,
  Menu,
  CardOverflow,
  CardContent,
  Link,
  Input,
  IconButton,
  Grid,
  Sheet,
} from "@mui/joy";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import EditBlog from "../../components/EditBlog/EditBlog";
import Comment from "../../components/Comment/Comment";
import NotesIcon from "@mui/icons-material/Notes";
import dayjs from "dayjs";
import { setLoading } from "../../store/slices/appSlice";

function BlogDetails() {
  // Variables Initialization
  const params = useParams();
  const [blog, setBlog] = useState({});
  const [isCalling, setIsCalling] = useState(false);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [commentMode, setCommentMode] = useState("new");
  const [processing, setProcessing] = useState(true);
  const { auth, _id } = useSelector((state) => state.user.userCredentials);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentRef = useRef();
  const commentRef = useRef();

  const [currentComment, setCurrentComment] = useState({});

  const handleEdit = (mode) => {
    setEditMode(mode);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { value } = e.target.content;
    if (value != "") {
      let comment = {
        content: value,
        author: _id,
        blog: params.id,
      };
      // For New Comment
      if (commentMode === "new") {
        const response = await createComment(comment);
        if (response.status === 201) {
          setContent("");
          setIsCalling(!isCalling);
          commentRef.current.querySelector("input").focus();
        }
      } else {
        // For Update Comment
        comment._id = currentComment._id;
        const response = await updateComment(comment);
        if (response.status === 200) {
          setContent("");
          console.log(response);
          setCommentMode("new");
          setIsCalling(!isCalling);
        }
      }
    }
  };
  const handleCommentDelete = async (id) => {
    dispatch(setLoading(true));
    const response = await deleteComment(id);
    try {
      if (response.status === 200) {
        setIsCalling(!isCalling);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleCommentEdit = (comment) => {
    setCommentMode("edit");
    commentRef.current.querySelector("input").focus();
    setContent(comment.content);
    setCurrentComment(comment);
  };
  const handleBlogDeletion = async () => {
    try {
      const response = await deleteBlog(blog._id);
      if (response.status === 200) {
        console.log(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function getSpecificBlog() {
      setProcessing(true);
      const response = await getBlogById(params.id);
      if (response.status === 200) {
        const currentBlog = response.data.blog;
        setBlog(currentBlog);
        setProcessing(false);
        if (contentRef.current) {
          contentRef.current.innerHTML = currentBlog?.content;
        }
      }
    })();

    return () => {
      setBlog({});
    setComments([]);
    }
  }, []);
  useEffect(() => {
    (async function getBlogAllComments() {
      setProcessing(true);
      const response = await getBlogComments(params.id);
      if (response.status === 200) {
        setComments(response.data.comment);
        setProcessing(false);
      }
    })();

    return () => {
      setComments([])
    }
  }, [isCalling]);
  return (
    <>
      <EditBlog
        openModal={editMode}
        blog={blog}
        onComplete={handleEdit}
        mode="edit"
      />
      <Grid container>
        <Grid md={7} lg={8} sx={{ p: 1, pb: 0, pr: {md: 0},width: '100%'}}>
          <Card
            variant="plain"
            size="sm"
            sx={{
              minWidth: 300,
              "--Card-radius": (theme) => theme.vars.radius.md,
            }}
          >
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", gap: 1 }}
            >
              <Typography fontWeight="lg">{blog?.title}</Typography>
              {auth && _id === blog?.author?._id && (
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ ml: "auto" }}
                  >
                    <MoreHoriz />
                  </MenuButton>
                  <Menu>
                    <MenuItem onClick={() => handleEdit(true)}>Edit</MenuItem>
                    <MenuItem onClick={handleBlogDeletion}>Delete</MenuItem>
                  </Menu>
                </Dropdown>
              )}
            </CardContent>
            <CardOverflow sx={{px:2}}>
              <AspectRatio>
                <img
                  src={blog?.photo}
                  alt=""
                  loading="lazy"
                  style={{ objectFit: "contain" }}
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Link
                component="button"
                underline="none"
                fontSize="sm"
                fontWeight="lg"
                textColor="text.primary"
              >
                By {blog?.author?.name}
              </Link>
              <Typography fontSize="sm" ref={contentRef} />
              <Link
                component="button"
                underline="none"
                fontSize="10px"
                sx={{ color: "text.tertiary", my: 0.5 }}
              >
                {dayjs(blog?.createdAt).format("MMM D, YYYY h:mm A")}
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid md={5} lg={4} sx={{ p: 1, position: 'relative', width: '100%' }}>
          {/* <MiscSidebar></MiscSidebar> */}
          <Sheet sx={{position: 'sticky', top: 10}}>
            <Typography level="title-md" fontWeight={600} p={2}>
              Comments
            </Typography>
            <Sheet sx={{ display: "flex", gap: 1, alignItems: "center", px:2 }}>
              <NotesIcon />
              <form
                onSubmit={handleCommentSubmit}
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Input
                  variant="soft"
                  size="sm"
                  name="content"
                  value={content}
                  ref={commentRef}
                  onInput={(e) => setContent(e.target.value)}
                  placeholder={
                    auth ? "Add a comment…" : "Login to Add comments"
                  }
                  disabled={!auth || processing}
                  endDecorator={
                    <IconButton
                      size="sm"
                      variant="plain"
                      color="neutral"
                      role="button"
                      type="submit"
                    >
                      <SendIcon />
                    </IconButton>
                  }
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                    width: "100%",
                    "--Input-focusedThickness": "0px",
                  }}
                />
              </form>
            </Sheet>
            <Card color="neutral" size="sm" variant="plain">
              {comments.length == 0 && <Typography>No comments yet</Typography>}
              {comments.map((comment, index) => (
                <Comment
                  key={index}
                  comment={comment}
                  onCommentDelete={handleCommentDelete}
                  onCommentEdit={handleCommentEdit}
                />
              ))}
            </Card>
          </Sheet>
        </Grid>
      </Grid>
    </>
  );
}

export default BlogDetails;
