import React from "react";
import { Box, FormControl, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchField = ({ searchTerm, onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Box mb={3} px={3}>
      <FormControl fullWidth>
        <OutlinedInput
          placeholder="Search a book"
          value={searchTerm}
          onChange={handleChange}
          startAdornment={<SearchIcon />}
        />
      </FormControl>
    </Box>
  );
};

export default SearchField;
