import React, { useEffect } from "react";
import Slider from "rc-slider";
import { millisToMinutesAndSeconds } from "../lib/time";
import { useDataContext } from "../context/data";

function TimeBar({ player }) {
  const { currentTrack } = useDataContext();
  const { duration_ms } = currentTrack;
  const { time, setTime, is_paused, position } = useDataContext();

  return (
    <>
      <div className="w-full hidden md:flex justify-center items-center gap-4">
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
