import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (results.length > 0) {
        setSearchResults(results);
        setError("");
      } else {
        setSearchResults([]);
        setError(
          <div>
            No results found for "{searchTerm}"
            <a
              href="https://jsonplaceholder.typicode.com/posts"
              target="_blank"
              rel="noreferrer"
            >
              API Visit!
            </a>
          </div>
        );

        //   setError(`No results found for "${searchTerm}" `);
      }
    } else {
      setSearchResults([]);
      setError(
        searchTerm.length > 0
          ? "Please enter at least 3 characters"
          : "This field is required"
      );
    }
  }, [data, searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBlur = () => {
    if (searchTerm.length === 0) {
      setError("This field is required");
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <TextField
        sx={{ width: 320 }}
        label="Search"
        placeholder="Please Enter Some characters"
        size="small"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error !== ""}
        helperText={
          error || "The data you entered is available in this API list."
        }
      />

      {/* {searchResults.length > 0 && (
        <List>
          {searchResults.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      )} */}

      {searchResults.length > 0 ? (
        <List>
          {searchResults.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      ) : error ? (
        <div>{/* {error} */}</div>
      ) : null}
    </div>
  );
};

export default App;
