import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { currentTrack } from "../atoms/songAtom";
import { useRecoilValue } from "recoil";

const DataContext = createContext();

export function DataWrapper({ children }) {
  const [data, setData] = useState({
    volume: 2,
  });
  const [is_paused, setPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(undefined);
  const { uri } = useRecoilValue(currentTrack);

  const toggleTimer = () => {
    if (!is_paused) {
      console.log("start");
      setTimer(
        setInterval(() => {
          setTime((time) => time + 1);
        }, 1000)
      );
      return;
    }
    if (is_paused) {
      console.log("stop");

      clearInterval(timer);
      setTimer(undefined);
      return;
    }
  };

  const resetTimer = () => {
    setTime(0);
  };

  useEffect(() => {
    console.log('toggle');
    toggleTimer();
  }, [is_paused]);

  useEffect(() => {
    resetTimer();
  }, [uri]);

  return (
    <DataContext.Provider
      value={{ data, setData, time, setTime, is_paused, setPaused }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
