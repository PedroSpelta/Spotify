import { debounce } from "lodash";
import React, { useState } from "react";
import { useCallback, useEffect } from "react/cjs/react.development";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrack, isPaused } from "../atoms/songAtom";
import Slider from "rc-slider";
import { millisToMinutesAndSeconds } from "../lib/time";
import { parseRelativeUrl } from "next/dist/shared/lib/router/utils/parse-relative-url";
import { timeState } from "../atoms/playerAtom";

function TimeBar({ player }) {
  const { duration_ms, uri } = useRecoilValue(currentTrack);
  const [inputDuration, setInputDuration] = useState(0);
  const is_paused = useRecoilValue(isPaused);
  const [position, setPosition] = useRecoilState(timeState);

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(undefined);

  const toggleTimer = () => {
    if (!is_paused) {
      setTimer(
        setInterval(() => {
          setTime((time) => time + 1);
        }, 1000)
      );
    }
    if (is_paused) {
      clearInterval(timer);
      setTimer(undefined);
    }
  };

  const resetTimer = () => {
    setTime(0);
  };

  useEffect(() => {
    toggleTimer();
  }, [is_paused]);

  useEffect(() => {
    resetTimer();
  }, [uri]);

  const debouceDuration = useCallback(
    debounce((inputDuration, player) => {
      // if (player) {
      //   player.seek(inputDuration);
      // }
    }, 500),
    []
  );

  useEffect(() => {
    setTime(position / 1000);
    // if (position > time * 1000) {
    // }
    // return;
  }, [position]);

  useEffect(() => {
    debouceDuration(inputDuration, player);
  }, [inputDuration]);

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
          {millisToMinutesAndSeconds(duration_ms)}
        </p>
      </div>
    </>
  );
}

export default TimeBar;
