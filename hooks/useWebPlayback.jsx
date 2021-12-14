import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { webPlayerState } from '../atoms/playerAtom';
import { currentTrack, isActive, isPaused } from '../atoms/songAtom';
import useSpotify from './useSpotify';


function useWebPlayback() {
  const [ogplayer, setGPlayer] = useRecoilState(webPlayerState);
  const [oplayer, setPlayer] = useState(undefined);
  const spotifyApi = useSpotify();
  const [is_paused, setPaused] = useRecoilState(isPaused);
  const [current_track, setTrack] = useRecoilState(currentTrack);
  const [is_active, setActive] = useRecoilState(isActive);

  
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
          function () {
            console.log("Transfering playback to " + deviceIds);
          },
          function (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
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
        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });
      
      player.connect();
    };
  }, []);

  // useEffect(() => {
  //   console.log('player change');
  //   setGPlayer(oplayer)
  // }, [oplayer])

  return oplayer;
}

export default useWebPlayback
