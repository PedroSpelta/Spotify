import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import WebPlayback from "./WebPlayback";

function Player() {
  // const spotifyApi = useSpotify();
  // const { data: session, status } = useSession();
  // const [currentTrackId, setCurrentIdTrackId] =
  //   useRecoilState(currentTrackIdState);
  // const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  // const [volume, setVolume] = useState(50);
  // const songInfo = useSongInfo();

  // const fetchCurrentSong = () => {
  //   if (!songInfo) {
  //     spotifyApi.getMyCurrentPlayingTrack().then((data) => {
  //       console.log("playing: ", data.body?.item);
  //       setCurrentIdTrackId(data.body?.item?.id);
  //       spotifyApi.getMyCurrentPlaybackState().then((date) => {
  //         setIsPlaying(data.body?.is_playing);
  //       });
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (spotifyApi.getAccessToken() && !currentTrackId) {
  //     // spotifyApi.
  //     fetchCurrentSong();
  //     setVolume(50);
  //   }
  // }, [currentTrackId, spotifyApi, session]);

  return (
      <WebPlayback />
  );
}

export default Player;
