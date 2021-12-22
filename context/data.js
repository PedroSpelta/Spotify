import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

const DataContext = createContext();

export function DataWrapper({ children }) {
  const [data, setData] = useState({
    volume: 2,
  });
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(undefined);
  const [is_paused, setPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [position, setPosition] = useState(0);
  const [lyrics, setLyrics] = useState([]);
  const [showLyrics, setShowLyrics] = useState(false);

  const toggleTimer = () => {
    if (!is_paused) {
      setTimer(
        setInterval(() => {
          setTime((time) => time + 1);
        }, 1000)
      );
      return;
    }
    if (is_paused) {
      clearInterval(timer);
      setTimer(undefined);
      return;
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
  }, [currentTrack.uri]);

  useEffect(() => {
    setTime(position / 1000);
  }, [position]);

  return (
    <DataContext.Provider
      value={{
        showLyrics,
        setShowLyrics,
        lyrics,
        setLyrics,
        data,
        setData,
        time,
        setTime,
        is_paused,
        setPaused,
        setCurrentTrack,
        currentTrack,
        setPosition,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
