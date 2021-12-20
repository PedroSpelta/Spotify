import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrack, isPaused } from "../atoms/songAtom";
import Slider from "rc-slider";
import { millisToMinutesAndSeconds } from "../lib/time";
import { timeState } from "../atoms/playerAtom";
import { useDataContext } from "../context/data";

function TimeBar({ player }) {
  const { duration_ms, uri } = useRecoilValue(currentTrack);
  // const is_paused = useRecoilValue(isPaused);
  const [position, setPosition] = useRecoilState(timeState);
  const { time, setTime, is_paused } = useDataContext();
  

  useEffect(() => {
    setTime(position / 1000);
    // if (position > time * 1000) {
    // }
    // return;
  }, [position]);

  return (
    <>
      <div className="flex w-full justify-center items-center gap-4">
        {/* <input type="range" min={0} max={100} onChange={(e) => {setVolume(Number(e.target.value))}}/> */}
        <p className="text-gray-300 text-sm">
          {millisToMinutesAndSeconds(time * 1000)}
        </p>
        <Slider
          min={0}
          max={duration_ms}
          value={time * 1000}
          railStyle={{ height: 6, background: "gray" }}
          handleStyle={{ border: 0, background: "white" }}
          trackStyle={{
            background: "white",
            height: 6,
          }}
          onAfterChange={(e) => {
            player.seek(e);
          }}
          onChange={(e) => {
            setTime(e / 1000);
          }}
        />
        <p className="text-gray-300 text-sm">
          {duration_ms ? millisToMinutesAndSeconds(duration_ms) : "0:00"}
        </p>
      </div>
    </>
  );
}

export default TimeBar;
