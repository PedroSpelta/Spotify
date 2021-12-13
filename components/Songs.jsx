import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
  const playList = useRecoilValue(playlistState);
  return (
    <div>
      <div className="px-8 flex text-white flex-col space-y-1 pb-28">
        {playList?.tracks.items.map((track, index) => (
          <Song key={track.track.id} track={track} order={index}/>
        ))}
      </div>
    </div>
  );
}

export default Songs;
