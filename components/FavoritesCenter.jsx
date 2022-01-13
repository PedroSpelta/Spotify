import { StarIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import PlaylistHeader from "./PlaylistHeader";
import Song from "./Song";
import UserHeaderImg from "./UserHeaderImg";

const color = ["#db3939", "#078f5f", "#0e2d66", "#ab58db", "#d613a2"];

function FavoritesCenter() {
  const spotifyApi = useSpotify();
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const playSong = async (order) => {
    console.log(topTracks);
    const playlistUris = topTracks.map((song) => song.uri);
    spotifyApi.play({
      uris: playlistUris,
      offset: {
        position: order,
      },
    });
  };

  useEffect(() => {
    spotifyApi.getMyTopTracks({ limit: 10 }).then(
      function (data) {
        setTopTracks(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    spotifyApi.getMyTopArtists({ limit: 5 }).then(
      function (data) {
        setTopArtists(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi]);

  return (
    <div className="h-screen w-full overflow-y-scroll scrollbar-hide">

      {/* user top image sign out */}
      <UserHeaderImg />

      {/* user header */}
      <PlaylistHeader
        color="from-blue-400"
        label="PLAYLIST"
        name="Favoritos"
      >
        <div className="w-[176px] h-[176px] flex justify-center items-center bg-gradient-to-tl from-[#a9d1f1] to-blue-800 shadow-2xl">
          <StarIcon className="w-10 h-10" />
        </div>
      </PlaylistHeader>
      
      {/* Aristas mais tocados */}
      <div className="flex flex-col px-16">
        <p className="text-3xl text-white teste pt-20 mb-5">Artistas mais tocados</p>
        <div className="flex items-center teste gap-5 flex-wrap">
          {topArtists.map((artist, i) => {
            return (
              <div
                className={`relative pt-2 w-36 h-36 rounded-lg text-white text-xl overflow-hidden`}
                key={artist.id}
                style={{ backgroundColor: color[i] }}
              >
                <p className="px-3 strunc z-10 relative">{artist.name}</p>
                <img
                  src={artist.images[0].url}
                  className="w-24 rotate-[24deg] overflow-hidden absolute bottom-[-10px] right-[-20px]"
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* musicas mais tocadas */}
      <div className="flex flex-col px-16 mt-20">
        <p className="text-3xl text-white teste mb-5">Músicas mais tocadas</p>
        <div className="flex flex-col teste flex-wrap">
          {topTracks.map((track, index) => {
            return (
              <Song
                key={track.id}
                track={track}
                order={index}
                onClick={() => playSong(index)}
              />
              // <div
              //   className={`relative pt-5 w-56 h-64 rounded-lg text-white text-xl overflow-hidden scale-50`}
              //   key={track.id}
              //   style={{ backgroundColor: color[i] }}
              // >
              //   <p className="px-5 strunc">{track.name}</p>
              //   <img
              //     src={track.album.images[0].url}
              //     className="w-36 h-3w-36 rotate-[24deg] overflow-hidden absolute bottom-[-10px] right-[-20px]"
              //     alt=""
              //   />
              // </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FavoritesCenter;

`${color}`;
