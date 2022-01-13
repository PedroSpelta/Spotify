import { HeartIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import PlaylistHeader from "./PlaylistHeader";
import Song from "./Song";
import UserHeaderImg from "./UserHeaderImg";

function LikedCenter() {
  const spotifyApi = useSpotify();
  const [likedTracks, setLikedTracks] = useState([]);

  useEffect(() => {
    spotifyApi.getMySavedTracks({ limit: 50 }).then(
      (data) => {
        const tracks = data.body.items;
        setLikedTracks(tracks);
      },
      (err) => {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi]);

  const playSong = async (order) => {
    const playlistUris = likedTracks.map((song) => song.track.uri);
    spotifyApi.play({
      uris: playlistUris,
      offset: {
        position: order,
      },
    });
  };

  return (
    <div className="h-screen w-full overflow-y-scroll scrollbar-hide relative">

      {/* user top image sign out */}
      <UserHeaderImg />
      
      {/* user header */}
      <PlaylistHeader
        color="from-indigo-500"
        label="PLAYLIST"
        name="Musicas curtidas"
      >
        <div className="w-[176px] h-[176px] flex justify-center items-center bg-gradient-to-tl from-[#798C8A] to-indigo-800 shadow-2xl">
          <HeartIcon className="w-10 h-10" />
        </div>
      </PlaylistHeader>

      {/* historico de musicas */}
      <div className="flex flex-col px-16">
        <div className="flex flex-col teste flex-wrap">
          {likedTracks.map((track, index) => {
            return (
              <Song
                key={index}
                track={track.track}
                order={index}
                onClick={() => playSong(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LikedCenter;
