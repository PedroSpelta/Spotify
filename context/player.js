import { createContext, useContext } from "react";
import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useDataContext } from "./data";

const PlayerContext = createContext();

export function PlayerWrapper({ children }) {
  const [oplayer, setPlayer] = useState(undefined);
  const spotifyApi = useSpotify();
  const { is_paused, setPaused, setPosition } = useDataContext();
  const { setCurrentTrack } = useDataContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = spotifyApi.getAccessToken();
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.1,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        const deviceIds = [device_id];
        spotifyApi.transferMyPlayback(deviceIds).then(
          function async() {
            console.log("Transfering playback to " + deviceIds);
            setIsReady(true);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          if (state) setPosition(state.position);
          // !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  return (
    <PlayerContext.Provider value={{ oplayer, isReady }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}
