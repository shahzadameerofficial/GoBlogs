import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Sheet,
  Button,
  ButtonGroup
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../utils/api";
import { setUserCredentials } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { setConfirmDialog } from "../../store/slices/appSlice";

// eslint-disable-next-line react/prop-types
export default function Profile({ createBlog, totalBlogs }) {
  const userCredentials = useSelector((state) => state.user.userCredentials);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAccountDelete = async() => {
    const userId = userCredentials._id;
    const response = await deleteAccount(userId)
    if( response.status === 200){
      const {_id, name, email} = response.data.user
      const credentials = {
        name,
        _id,
        email,
        auth: response.data.auth
      }
      dispatch(setUserCredentials(credentials))
      navigate('/')
    }
  }

  const showDialog = () => {
    const dialog = {
      visible: true,
      message: 'Are you sure to delete your Account?'
    }
    dispatch(setConfirmDialog(dialog))
  }
  return (
    <Card
      variant="plain"
      color="neutral"
      sx={{
        boxShadow: "lg",
        m: ".5rem .5rem 0"
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar />
        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: '4px', mr: "auto" }}>
          <Typography level="title-lg" color="primary">
            Welcome back {userCredentials.name}!
          </Typography>
          <Typography level="body-xs">{userCredentials.email}</Typography>
          <ButtonGroup sx={{ mt: 'auto'}} spacing={1}>
          <Button size='sm' variant="solid" color="neutral" onClick={createBlog}>Create Blog</Button>

          <Button size='sm' variant="soft" color="danger" onClick={showDialog}>Remove Account</Button>
          </ButtonGroup>
        </Sheet>
        {/* <IconButton onClick={createBlog} size="lg" title="New Blog" variant="solid" color="primary" sx={{alignSelf: 'center', borderRadius: '50%'}}>
          <Add />
        </IconButton> */}
        <Card variant='soft' color="neutral" size='sm' sx={{textAlign: 'center'}}>
          <Typography level="title-lg">{totalBlogs}</Typography>
          <Typography level="title-md">Total Blogs</Typography>
        </Card>
      </CardContent>
      <ConfirmDialog onConfirm={handleAccountDelete}/>
    </Card>
  );
}
