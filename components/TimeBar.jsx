import { debounce } from "lodash";
import React, { useState } from "react";
import { useCallback, useEffect } from "react/cjs/react.development";
import { useRecoilValue } from "recoil";
import { currentTrack, isPaused } from "../atoms/songAtom";
import Slider from "rc-slider";
import { millisToMinutesAndSeconds } from "../lib/time";

function TimeBar({ player }) {
  const { duration_ms, uri } = useRecoilValue(currentTrack);
  const [inputDuration, setInputDuration] = useState(0);
  const is_paused = useRecoilValue(isPaused);

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(undefined);

  const stopTimer = (t) => {
    console.log("stop");
    clearInterval(t);
    setTimer(undefined);
  };

  const resetTimer = () => {
    if (!is_paused) {
      console.log("reset timer not paused");
      clearInterval(timer);
      let times = 0;
      setTimer(
        setInterval(() => {
          setTime(times);
          setInputDuration(times * 1000);
          times += 1;
        }, 1000)
      );
    }
    // if (is_paused) {
    //   console.log("reset timer paused");
    //   clearInterval(timer);
    //   setTime(0);
    //   setInputDuration(0);
    // }
  };

  const resumeTimer = () => {
    if (!timer) {
      console.log("resume");
      let times = time;
      setTimer(
        setInterval(() => {
          setTime(times);
          setInputDuration(times * 1000);
          times += 1;
        }, 1000)
      );
    }
  };

  useEffect(() => {
    resetTimer();
  }, [uri]);

  useEffect(() => {
    if (is_paused && timer) {
      stopTimer(timer);
    } else if (!is_paused && !timer) {
      resumeTimer();
    }
  }, [is_paused]);

  // useEffect(() => {
  //   stopTimer(timer);
  //   if (!isPaused) {
  //     if (!timer) {
  //       console.log('notimer');
  //     }
  //   }
  // }, [uri, timer]);

  const debouceDuration = useCallback(
    debounce((inputDuration, player) => {
      // if (player) {
      //   player.seek(inputDuration);
      // }
    }, 500),
    []
  );

  useEffect(() => {
    debouceDuration(inputDuration, player);
  }, [inputDuration]);

  return (
    <>
      {millisToMinutesAndSeconds(time * 1000)}
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
