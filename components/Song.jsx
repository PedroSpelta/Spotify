import React from "react";
import { useRecoilState } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ track, order, onClick }) {

  return (
    <div
      className="grid grid-cols-2 text-gray-400 py-4 px-4 md:px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={() => onClick()}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img src={track.album.images[0].url} alt="" className="h-10 w-10" />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.name}</p>
          <p className="w-40">{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden album-truncate">{track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
