/* eslint-disable react/prop-types */
import {
  IconButton,
  Input,
} from "@mui/joy";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSearchQuery } from "../../store/slices/blogSlice";

function SearchBox({sx, onComplete}) {
  const navigate = useNavigate()
  const {searchQuery} = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target.searchbar.value;
    navigate('/search/'+query)
    onComplete?.(e.target.query)
  };

  return (
    <form action="" onSubmit={handleSearch}>
      <Input
        type="search"
        name="searchbar"
        placeholder="Search by Title..."
        sx={sx}
        onInput={(e)=> dispatch(updateSearchQuery(e.target.value))}
        value={searchQuery || ''}
        endDecorator={
          <IconButton type="submit">
            <Search />
          </IconButton>
        }
      />
    </form>
  );
}

export default SearchBox;
