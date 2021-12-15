import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import useSpotify from "../hooks/useSpotify";

const color = ["#db3939", "#078f5f", "#0e2d66", "#ab58db", "#d613a2"];

function FavoritesCenter() {
  const spotifyApi = useSpotify();
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    spotifyApi.getMyTopTracks({ limit: 5 }).then(
      function (data) {
        console.log(data.body.items);
        setTopTracks(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    spotifyApi.getMyTopArtists({limit: 5}).then(
      function (data) {
        console.log(data.body.items);
        setTopArtists(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    )
  }, [spotifyApi]);

  return (
    <div className="h-screen w-full overflow-y-scroll scrollbar-hide">
      <div className="h-80 flex bg-gradient-to-b from-green-600 to-black "></div>
      <div className="flex flex-col px-16 mt-[-100px]">
        <p className="text-3xl text-white teste">Músicas mais tocadas</p>
        <div className="flex items-center teste gap-5 flex-wrap">
          {topTracks.map((track, i) => {
            return (
              <div>

              <div
                className={`relative pt-5 w-56 h-64 rounded-lg text-white text-xl overflow-hidden`}
                key={i}
                style={{ backgroundColor: color[i] }}
              >
                <p className="px-5 strunc">{track.name}</p>
                <img
                  src={track.album.images[0].url}
                  className="w-36 h-3w-36 rotate-[24deg] overflow-hidden absolute bottom-[-10px] right-[-20px]"
                  alt=""
                />
              </div>
              </div>
            );
          })}
        </div>
        <p className="text-3xl text-white teste pt-20">Artistas mais tocados</p>
        <div className="flex items-center teste gap-5 flex-wrap">
          {topArtists.map((artist, i) => {
            return (
              <div
                className={`relative pt-5 w-56 h-64 rounded-lg text-white text-xl overflow-hidden`}
                key={i}
                style={{ backgroundColor: color[i] }}
              >
                <p className="px-5 strunc">{artist.name}</p>
                <img
                  src={artist.images[0].url}
                  className="w-36 h-3w-36 rotate-[24deg] overflow-hidden absolute bottom-[-10px] right-[-20px]"
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FavoritesCenter;

`${color}`;
