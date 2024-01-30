import React, { useEffect, useState } from "react";
import "./css/App.css";
import "./css/_button.css";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import PlaylistContainer from "./components/PlaylistContainer";
import TracklistContainer from "./components/TracklistContainer";
import Footer from "./components/Footer";

const CLIENT_ID = "9db45e5eeb2a48ccaa82c44bb7dfe32f";
const CLIENT_SECRET = "f2857cbf3b2b4777a4f681a61f8d727b";

function App() {
  //Spotify API Access Token
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const params = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    const fetchAccessToken = async () => {
      try {
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          params
        );
        if (response.ok) {
          const data = await response.json();
          setAccessToken(data["access_token"]);
        } else {
          throw new Error("Request Failed!");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchAccessToken();
  }, []);

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  // Fecth Playlists
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("./playlists.json");
        if (response.status === 200) {
          const data = await response.json();
          setPlaylists(data["playlists"]);
        } else {
          throw new Error("Request Failed!");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlaylists();
  }, []);

  // Fetch Music tracks

  // const [musicTracks, setMusicTracks] = useState([]);
  // useEffect(() => {
  //   const fetchMusicTracks = async () => {
  //     try {
  //       const response = await fetch("./musics.json");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMusicTracks(data["musics"]);
  //       } else {
  //         throw new Error("Request Failed!");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchMusicTracks();
  // }, []);

  const [musicTracks, setMusicTracks] = useState([]);
  const handleSearch = (results) => {
    setMusicTracks(results.tracks.items);
  };

  useEffect(() => {
    console.log(musicTracks);
  }, [musicTracks]);

  return (
    <div className="App">
      <div className="main">
        <Header>
          <SearchBar token={accessToken} handleSearchResults={handleSearch} />
        </Header>
        <div className="contentWrapper">
          <PlaylistContainer playlists={playlists} />
          <TracklistContainer musics={musicTracks} hasTracks={true} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
