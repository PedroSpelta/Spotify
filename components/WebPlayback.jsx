import React, { useCallback, useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { BiSkipPrevious, BiSkipNext, BiPlay, BiStop } from "react-icons/bi";
import { debounce } from "lodash";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [player, setPlayer] = useState(undefined);
  const spotifyApi = useSpotify();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = spotifyApi.getAccessToken();
      console.log(token);
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
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

  const debounceVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch(() => {});
    }, 500),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceVolume(volume);
    }
  }, [volume]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={current_track?.album.images?.[0].url}
          alt=""
        />
        <div>
          <h3>{current_track?.name}</h3>
          <p>{current_track?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-center text-gray-600">
        <BiSkipPrevious
          className="w-10 h-10 hover:text-white"
          onClick={() => {
            player.previousTrack();
          }}
        />
        {is_paused ? (
          <div
            className="rounded-full w-10 h-10 bg-white flex justify-center items-center hover:scale-105"
            onClick={() => player.resume()}
          >
            <BiPlay className="pl-1 w-8 h-8 text-black" />
          </div>
        ) : (
          <div
            className="rounded-full w-10 h-10 bg-white flex justify-center items-center hover:scale-105"
            onClick={() => player.pause()}
          >
            <BiStop className="w-6 h-6 text-black" />
          </div>
        )}
        <BiSkipNext
          className="w-8 h-8 hover:text-white"
          onClick={() => player.nextTrack()}
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="w-32">
          {/* <input type="range" min={0} max={100} onChange={(e) => {setVolume(Number(e.target.value))}}/> */}
          <Slider
            min={0}
            max={100}
            railStyle={{ height: 6, background: "gray" }}
            handleStyle={{ border: 0, background: "white" }}
            trackStyle={{
              background: "white",
              height: 6,
            }}
            onChange={(e) => {
              setVolume(Number(e));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WebPlayback;
