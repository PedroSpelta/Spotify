import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import useSpotify from "../hooks/useSpotify";
import { getLyricArray, getLyrics } from "../lib/lyrics";

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
  const [playback, setPlayback] = useState();
  const spotifyApi = useSpotify();

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

  useEffect(async () => {
    toggleTimer();
  }, [is_paused]);

  useEffect(async () => {
    resetTimer();
    const title = currentTrack.name;
    if (currentTrack.name === '') return
    const artist = currentTrack.artists[0].name;
    const searchTerm = title + " " + artist;
    await axios({
      method: "post",
      url: "/api/lyrics",
      data: { searchTerm: searchTerm },
    }).then((res) => {
      console.log('teste',res.data);
      const { lyric } = res.data;
      const lyricArray = getLyricArray(lyric);
      setLyrics(lyricArray);
    });
  }, [currentTrack.uri]);

  useEffect(() => {
    setTime(position / 1000);
  }, [position]);

  return (
    <DataContext.Provider
      value={{
        playback,
        setPlayback,
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
