import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Song from "./Song";

function Songs() {
  const playList = useRecoilValue(playlistState);
  const spotifyApi = useSpotify();
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const playSong = async (order) => {
    const playlistUris = playlist.tracks.items.map((song) => song.track.uri);
    spotifyApi.play({
      uris: playlistUris,
      offset: {
        position: order,
      },
    });
  };

  return (
    <div>
      <div className="px-2 md:px-6 flex text-white flex-col space-y-1 pb-28">
        {playList?.tracks.items.map((track, index) => (
          <Song
            key={track.track.id}
            track={track.track}
            order={index}
            onClick={() => playSong(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Songs;
