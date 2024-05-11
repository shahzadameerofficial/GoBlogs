/* eslint-disable react/prop-types */
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import dayjs from "dayjs";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Blog({ blog }) {
  const navigate = useNavigate();
  const contentRef = useRef();
  if (contentRef.current) {
    contentRef.current.innerHTML = blog.content?.slice(0, 100) + "...";
  }
  return (
    <Card
      variant="outlined"
      sx={{ my: 1, flex: 1}}
      onClick={() => navigate("/blogs/" + blog._id)}
    >
      <CardOverflow>
        <AspectRatio ratio="2" objectFit="cover">
          <img src={blog?.photo} alt="" />
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{ textAlign: "start" }}>
        {blog?.author?.name && <Typography level="body-xs" color="primary" variant="plain">
          Author: {blog?.author.name}
        </Typography>}
        <Typography level="title-md">{blog?.title}</Typography>
        <Typography level="body-sm" ref={contentRef} />

        <Typography
          level="body-xs"
          fontWeight="md"
          textColor="text.secondary"
          mt="auto"
        >
          {dayjs(blog?.createdAt).format("MMM D, YYYY h:mm A")}
        </Typography>
      </CardContent>
    </Card>
  );
}
