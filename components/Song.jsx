import React from "react";
import { useRecoilState } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ track, order }) {
  const spotifyApi = useSpotify();
  const [playlist, setPlaylist] = useRecoilState(playlistState);


  const playSong = () => {
    const playlistUris = playlist.tracks.items.map((song) => song.track.uri);
    spotifyApi.play({
      uris:playlistUris,
      offset: {
        position: order
      }
    })
  }

  return (
    <div className="grid grid-cols-2 text-gray-400 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer" onClick={playSong}>
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          src={track.track.album.images[0].url}
          alt=""
          className="h-10 w-10"
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
