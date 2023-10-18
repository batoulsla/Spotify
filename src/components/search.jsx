import React, { useState, useEffect } from "react";
import logo from "../assets/Spotify_logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import StarIcon from "@mui/icons-material/Star";
import { CardMedia, Typography } from "@mui/material";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const location = useLocation();
  const [access_token, setAccessToken] = useState(null);
  const { search } = useLocation();
  const parsedQuery = queryString.parse(search);
  const retrievedAccessToken = parsedQuery.access_token;
  const searchInputRef = useRef(null);

  useEffect(() => {
    const accessToken = location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        const parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});

    const { access_token } = accessToken;
    setAccessToken(access_token);
  }, [location.hash]);

  useEffect(() => {
    if (retrievedAccessToken) {
      setAccessToken(retrievedAccessToken);
    }
  }, [retrievedAccessToken]);

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    sessionStorage.setItem("searchText", searchText);

    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch();
    }, 500);
  };
  const handleClearStorage = () => {
    // Clear stored data
    sessionStorage.removeItem("searchText");
    localStorage.removeItem("searchResults");
    // Navigate to the home page
    navigate("/");
  };

  const isMobile = screenWidth < 990;
  useEffect(() => {
    const storedSearchText = sessionStorage.getItem("searchText");
    const storedSearchResults = JSON.parse(
      localStorage.getItem("searchResults")
    );

    if (storedSearchText) {
      setSearchText(storedSearchText);
    }

    if (storedSearchResults) {
      setSearchResults(storedSearchResults);
    }

    if (location.state && location.state.triggerSearch) {
      setSearchText(location.state.searchText);
      handleSearch();
    }
  }, [location, location.state]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let timer;

  const handleSearch = () => {
    setIsSearching(true);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchText}&type=artist`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const artists = response.data.artists.items;
        setSearchResults(artists);

        // Store the search results in localStorage
        localStorage.setItem("searchResults", JSON.stringify(artists));

        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Error searching for artists: ", error);
        setIsSearching(false);
      });
  };

  const handleArtistClick = (artistId, artistName) => {
    navigate(`/artist/${artistId}/albums`, {
      state: {
        access_token,
        artistName: artistName,
        searchText,
        searchResults,
        triggerSearch: true,
      },
    });
  };

  const renderPopularityStars = (popularity) => {
    const maxStars = 5;
    const numFilledStars = Math.min(Math.floor(popularity / 10), maxStars);

    return Array.from({ length: maxStars }, (_, index) => (
      <StarIcon
        key={index}
        style={{
          color: index < numFilledStars ? "gold" : "gray",
        }}
      />
    ));
  };

  return (
    <div>
      <Navbar
        fixed="top"
        expand="lg"
        className="navbar bg-light border-bottom border-body"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto header-nav justify-content-center">
            <Typography
              style={{ justifyContent: "center", fontWeight: "bold" }}
            >
              {" "}
              Spotify Artist Search
            </Typography>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        
      <div
  style={{
    display: "flex",
    marginTop: isMobile ? "15%" : "5%",
    alignItems: "center", 
  }}
>
  <ArrowBackIcon onClick={handleClearStorage} style={{ cursor: "pointer", marginLeft: "20px" }} />
  <div
    style={{
      display: "flex",
      alignItems: "center",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "300px",
      justifyContent: "center",
      height: "50px",
      marginLeft:isMobile ?  "6%":"40%",
    }}
  >
    <InputBase
      ref={searchInputRef}
      placeholder="Search for an Artist.."
      inputProps={{ label: "search" }}
      style={{ color: "grey" }}
      value={searchText}
      onChange={handleSearchChange}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
    />
    <SearchIcon style={{ color: "grey", marginLeft: "auto" }} />
  </div>
</div>


       

      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {isSearching && <p>Searching...</p>}
        {!isSearching &&
          searchResults.length > 0 &&
          searchResults.map((artist) => (
            <Card
              key={artist.id}
              style={{
                margin: "40px",
                cursor: "pointer",
                width: "250px",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => handleArtistClick(artist.id)}
            >
              <CardContent style={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  src={artist.images[0] ? artist.images[0].url : ""}
                  alt={artist.name}
                  style={{
                    width: "250px",
                    height: "200px",
                    marginTop: "-20px",
                    marginLeft: "-15px",
                  }}
                />
                <Typography style={{ fontSize: "18px" }}>
                  {artist.name}
                </Typography>
                <div style={{ fontSize: "14px", color: "#A7A7A7" }}>
                  {" "}
                  {artist.followers.total} followers
                </div>
                <div style={{ marginTop: "20%" }}>
                  {renderPopularityStars(artist.popularity)}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Search;
