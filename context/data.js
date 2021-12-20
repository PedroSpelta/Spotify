import { createContext, useContext } from "react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { timeState, webPlayerState } from "../atoms/playerAtom";
import { currentTrack, isActive, isPaused } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";

const DataContext = createContext();

export function DataWrapper({ children }) {
  const [data, setData] = useState({
    volume: 10,
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
