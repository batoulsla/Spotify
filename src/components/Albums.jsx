import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/Spotify_logo.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';

const Albums = () => {
  const { artistId } = useParams();
  const location = useLocation();
  const { access_token, searchResults } = location.state || {};
  const [albums, setAlbums] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth < 990;

  useEffect(() => {
    if (!access_token) {
      return;
    }

    // Fetch artist details using the artistId
    fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArtistName(data.name); // Set the artist name
      })
      .catch((error) =>
        console.error("Error fetching artist details: ", error)
      );
  }, [artistId, access_token]);

  useEffect(() => {
    if (!access_token) {
      return;
    }

    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAlbums(data.items || []))
      .catch((error) => console.error("Error fetching artist albums: ", error));
  }, [artistId, access_token, searchResults]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const navigate = useNavigate();

  const handleClick = () => {
    
    navigate('/search'); 
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

      <div style={{ marginTop: isMobile ? "15%" : "5%", marginLeft: "2%" }}>
      <ArrowBackIcon   onClick={handleClick} style={{ cursor: "pointer", marginLeft: "20px" }} />

        <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
          {artistName || "Artist Name Not Found"}
        </Typography>

        <Typography> Albums</Typography>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {albums.map((album) => (
          <Card
            key={album.id}
            style={{
              margin: "30px",
              width: "250px",
            
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent style={{ flexGrow: 1 }}>
              <img
                src={album.images[0] ? album.images[0].url : ""}
                alt={album.name}
                style={{
                  height: "150px",
                  width: "255px",
                  marginTop: "-20px",
                  marginLeft: "-20px",
                }}
              />
              <Typography style={{ fontSize: "14px" }}>{album.name}</Typography>
              <Typography style={{ fontSize: "12px", color: "#A7A7A7" }}>
                {album.artists.map((artist) => artist.name).join(", ")}
              </Typography>
            </CardContent>
            <Typography
              style={{ fontSize: "12px", color: "#A7A7A7", padding: "0 13px " }}
            >
              {album.release_date}
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                color: "#A7A7A7",
                padding: "0 13px 10px",
              }}
            >
              {album.total_tracks} Tracks
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open(album.external_urls.spotify, "_blank")}
              style={{
                backgroundColor: "grey",
                height: "40px",
                width: "300px",
                marginLeft: "-7%",
              }}
            >
              Preview on Spotify
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Albums;
