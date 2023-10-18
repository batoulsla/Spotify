import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container, Row, Col } from "react-bootstrap";
import logo from "../assets/Spotify_logo.svg";
import styled from "@emotion/styled";
import Music from "../assets/landing.svg";
import SpotifyLogo from "../assets/SpotifyIcon.svg";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const StyledNavLink = styled(Nav.Link)({
  color: "black",
  fontWeight: "bold",
  "&:visited": {
    color: "#1ED760",
  },
  "&:hover": {
    color: "#1ED760",
  },
  "&:active": {
    color: "#1ED760",
  },
});

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const handleLoginClick = () => {
  const scopes = ["user-library-read", "user-library-modify"];
  const state = "your_state_parameter";

  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    "client_id=" +
    clientId +
    "&redirect_uri=" +
    encodeURIComponent(redirectUri) +
    "&scope=" +
    encodeURIComponent(scopes.join(" ")) +
    "&response_type=token" +
    "&state=" +
    state;

  window.location.href = authUrl;
};

const Home = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth < 990;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#FFFFFF", paddingTop: "100px" }}>
      <Navbar
        fixed="top"
        expand="lg"
        className="navbar-home"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto header-nav justify-content-center">
            <StyledNavLink>Home</StyledNavLink>
            <StyledNavLink>Explore</StyledNavLink>
            <StyledNavLink>Premium</StyledNavLink>
          </Nav>
          <Button
            variant="primary"
            onClick={handleLoginClick}
            style={{
              backgroundColor: "#1ED760",
              borderColor: "#1ED760",
            }}
          >
            Login / Signup

          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        <Row className="d-lg-flex d-block">
          <Col>
            <Row className=" justify-content-center justify-content-md-start">
              <div></div>
              <Typography style={{ fontWeight: "bold", fontSize: isMobile ?"20px":"35px", marginTop:isMobile ?"0%": "15%" ,marginLeft:isMobile?"40%":""}}>
                Listening is Everything
              </Typography>
            </Row>
            <Row className=" justify-content-center justify-content-md-start">
              <Typography style={{ fontSize:isMobile ?"15px": "20px", color: "#1ED760", marginTop: "3%" ,marginLeft:isMobile?"40%":""}}>
                Explore Your Musical Journey, <br /> Discover Your Sound
              </Typography>
            </Row>
            <Row className="mb-3"></Row>
            <Row className=" justify-content-center">
              <button
                onClick={handleLoginClick}
                style={{
                  border: "1px solid #A9A9A9",
                  borderRadius: "8px",
                  background: "transparent",
                  marginTop: "10%",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                  marginLeft: isMobile ? "18%" : "-30%",
                  width:"300px",
                  height: "50px",
                }}
              >
                <Typography style={{ marginLeft: "30%" }}>Login</Typography>
                <img
                  src={SpotifyLogo}
                  alt="Spotify Logo"
                  style={{ width: "35px", height: "35px", marginLeft: "auto" }}
                />
              </button>
            </Row>
          </Col>
          <Col className=" justify-content-center">
  <div
    style={{
      position: "absolute",
      width: isMobile ? "90%" : "672px",
      height: isMobile ? "50%" : "516px",
      borderRadius: "436px 0px 417px 35px",
      background: "#1ED760",
    marginTop:isMobile?"20%":"0",
    marginLeft:isMobile?"15%":"0",
    }}
  >
    <img src={Music} alt="Music" style={{ maxWidth: "95%", maxHeight: "95%" }} />
  </div>
</Col>

        </Row>
      </Container>
    </div>
  );
};

export default Home;
