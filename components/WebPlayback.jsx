import React, { useCallback, useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrack, isPaused } from "../atoms/songAtom";
import PlayerControl from "./PlayerControl";

function WebPlayback() {
  const spotifyApi = useSpotify();
  const current_track = useRecoilValue(currentTrack);
  const [volume, setVolume] = useState(50);

  const debounceVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch(() => {});
    }, 500),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceVolume(volume);
    }
  }, [volume]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={current_track?.album.images?.[0].url}
          alt=""
        />
        <div>
          <h3>{current_track?.name}</h3>
          <p>{current_track?.artists?.[0]?.name}</p>
        </div>
      </div>
      <PlayerControl />
      <div className="flex items-center justify-center">
        <div className="w-32">
          {/* <input type="range" min={0} max={100} onChange={(e) => {setVolume(Number(e.target.value))}}/> */}
          <Slider
            min={0}
            max={100}
            value={volume}
            railStyle={{ height: 6, background: "gray" }}
            handleStyle={{ border: 0, background: "white" }}
            trackStyle={{
              background: "white",
              height: 6,
            }}
            onChange={(e) => {
              setVolume(Number(e));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WebPlayback;
