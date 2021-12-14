import { debounce } from "lodash";
import React, { useState } from "react";
import { useCallback, useEffect } from "react/cjs/react.development";
import { useRecoilValue } from "recoil";
import { currentTrack } from "../atoms/songAtom";
import Slider from "rc-slider";
import useWebPlayback from "../hooks/useWebPlayback";
import { millisToMinutesAndSeconds } from "../lib/time";

function TimeBar() {
  const { duration_ms, uri } = useRecoilValue(currentTrack);
  const [inputDuration, setInputDuration] = useState(0);
  const player = useWebPlayback();
  // console.log('timebar', player);

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(undefined);
  let times = 0;

  const stopTimer = (t) => {
    clearInterval(t);
  };

  const startTimer = () => {
    console.log("timer start");
    setTimer(
      setInterval(() => {
        times += 1;
        setTime(times);
        setInputDuration(times*1000);
      }, 1000)
    );
  };

  useEffect(() => {
    console.log("reset timer");
    // stopTimer(timer);
    // startTimer();
    // setInputDuration(0);
  }, [uri]);

  // const debouceDuration = useCallback(
  //   debounce((inputDuration, player) => {
  //     if (player) {
  //       console.log(player);
  //       console.log(millisToMinutesAndSeconds(inputDuration));
  //       player.seek(inputDuration);
  //     }
  //   }, 500),
  //   []
  // );

  useEffect(() => {
    // debouceDuration(inputDuration, player);
    console.log('inputduration', inputDuration);
  }, [inputDuration]);

  return (
    <>
      {millisToMinutesAndSeconds(time*1000)}
      <div className="w-full">
        {/* <input type="range" min={0} max={100} onChange={(e) => {setVolume(Number(e.target.value))}}/> */}
        <Slider
          min={0}
          max={duration_ms}
          value={inputDuration}
          railStyle={{ height: 6, background: "gray" }}
          handleStyle={{ border: 0, background: "white" }}
          trackStyle={{
            background: "white",
            height: 6,
          }}
          onChange={(e) => {
            setInputDuration(e);
          }}
        />
      </div>
    </>
  );
}

export default TimeBar;
