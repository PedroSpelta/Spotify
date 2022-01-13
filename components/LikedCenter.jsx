import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import Song from "./Song";

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
    <div className="h-screen w-full overflow-y-scroll scrollbar-hide">
      {/* Back ground color do topo */}
      <div className="h-80 flex bg-gradient-to-b from-green-600 to-[#121212] -mt-20 "></div>

      {/* historico de musicas */}
      <div className="flex flex-col px-16">
        <p className="text-3xl text-white teste mb-5">Músicas Curtidas</p>
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
