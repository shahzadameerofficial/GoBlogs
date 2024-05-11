/* eslint-disable react/prop-types */
import { Box, Avatar, Typography, ButtonGroup, Button } from "@mui/joy";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/plugins";
import dayjs from "dayjs";

function Comment({ comment, onCommentDelete, onCommentEdit }) {
  const { _id } = useSelector((state) => state.user.userCredentials);
  return (
    <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
      <Avatar variant="outlined" color="neutral">
        {comment?.author?.name?.slice(0, 2)?.toUpperCase()}
      </Avatar>
      <div>
        <Typography level="body-sm">{comment?.author?.name}</Typography>
        <Typography level="body-xs" lineHeight={1.2}>{comment.content}</Typography>
        <Typography level="body-xs" fontSize={9} title={dayjs(comment.createdAt).format('DD MMM YYYY hh:mm A')}>{formatDate(comment.createdAt)}</Typography>
      { comment.author._id === _id &&
        <ButtonGroup variant="plain" size="sm" spacing={1}>
          <Button size="xs" variant="plain" color="neutral" sx={{p: 0, fontWeight: 400, fontSize: '11px'}}onClick={()=> onCommentDelete(comment._id)}>Delete</Button>
          <Button size="xs" variant="plain" color="neutral" sx={{p: 0, fontWeight: 400, fontSize: '11px'}}onClick={()=> onCommentEdit(comment)}>Edit</Button>
        
      </ButtonGroup>}
      </div>
    </Box>
  );
}

export default Comment;
