/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { searchBlogsByTitle } from "../../utils/api";
import {
  updateSearchQuery,
  updateSearchResults,
} from "../../store/slices/blogSlice";
import BlogsContainer from "../../components/BlogsContainer/BlogsContainer";
import { setLoading } from "../../store/slices/appSlice";

function Search() {
  const { searchResults } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    (async function getSearchResults() {
      if(params.title === '' || !params.title){
        return <Navigate to='/'/>
      }
      dispatch(setLoading(true))
      dispatch(updateSearchQuery(params.title))
      
      const response = await searchBlogsByTitle(params.title);
      if (response.status === 200) {
        dispatch(setLoading(false))
        dispatch(updateSearchQuery(params.title));
        dispatch(updateSearchResults(response.data.blogs));
      }
    })();

    return ()=> {
        dispatch(updateSearchQuery(''));
        dispatch(updateSearchResults([]));
    }
  }, [params.title]);
  return (
    <>
      <Typography level="title-lg" p={2}>{`${searchResults.length} Search Results Found for keyword '${params.title}'.`}</Typography>
      <BlogsContainer blogs={searchResults}/>
    </>
  );
}

export default Search;
