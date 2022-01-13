import { LibraryIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import PlaylistHeader from "./PlaylistHeader";
import Song from "./Song";
import UserHeaderImg from "./UserHeaderImg";

function HistoryCenter() {
  const spotifyApi = useSpotify();
  const [recentTracks, setRecentTracks] = useState([]);

  useEffect(() => {
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 }).then(
      (data) => {
        const tracks = data.body.items;
        const filteredTracks = [];
        const filteredTracksUris = [];
        for (let i = 0; i < tracks.length; i += 1) {
          if (!filteredTracksUris.includes(tracks[i].track.uri)) {
            filteredTracksUris.push(tracks[i].track.uri);
            filteredTracks.push(tracks[i]);
          }
        }
        setRecentTracks(filteredTracks);
      },
      (err) => {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi]);

  const playSong = async (order) => {
    const playlistUris = recentTracks.map((song) => song.track.uri);
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
        color="from-yellow-600"
        label="PLAYLIST"
        name="Histórico"
      >
        <div className="w-[176px] h-[176px] flex justify-center items-center bg-gradient-to-tl from-[#7a815e] to-yellow-800 shadow-2xl">
          <LibraryIcon className="w-10 h-10" />
        </div>
      </PlaylistHeader>
      {/* historico de musicas */}
      <div className="flex flex-col px-16">
        <p className="text-3xl text-white teste mb-5">Histórico</p>
        <div className="flex flex-col teste flex-wrap">
          {recentTracks.map((track, index) => {
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

export default HistoryCenter;
