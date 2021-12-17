import React, { useCallback, useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrack, isPaused } from "../atoms/songAtom";
import PlayerControl from "./PlayerControl";
import useWebPlayback from "../hooks/useWebPlayback";

function WebPlayback() {
  const spotifyApi = useSpotify();
  const current_track = useRecoilValue(currentTrack);
  const [volume, setVolume] = useState(10);
  const player = useWebPlayback();

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
    <>
      <div className="hidden h-24 bg-[#121212] text-white md:grid grid-cols-3 text-xs md:text-base md:px-8 border-t border-[#3d3d3d]">
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
        <PlayerControl player={player} />
        <div className="flex items-center justify-center">
          <div className="w-32">
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
      <div className="h-24 bg-[#121212] text-white grid grid-cols-4 text-xs md:hidden border-t border-[#3d3d3d]">
        <div className="flex flex-col items-start ml-5 gap-1 justify-center col-span-3">
          <h3 className="text-lg font-bold truncate w-full">
            {current_track?.name}
          </h3>
          <p className="truncate">{current_track?.artists?.[0]?.name}</p>
          <div className="ml-[-10px]">
            <PlayerControl player={player} />
          </div>
        </div>
        <div className="flex items-center justify-end mr-3">
          <img
            className=" h-16 w-16 opacity-70 "
            src={current_track?.album.images?.[0].url}
            alt=""
          />
        </div>
        {/* controle de volume */}
        {/* <div className="flex items-center justify-center">
          <div className="w-32">
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
        </div> */}
      </div>
    </>
  );
}

export default WebPlayback;
