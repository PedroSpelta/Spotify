import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { useDataContext } from "../context/data";
import useSpotify from "../hooks/useSpotify";
import Song from "./Song";
const cheerio = require("cheerio");

function Songs() {
  const playList = useRecoilValue(playlistState);
  const spotifyApi = useSpotify();
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const {setLyrics} = useDataContext();

  const playSong = (order) => {
    const playlistUris = playlist.tracks.items.map((song) => song.track.uri);
    const test = playlist.tracks.items[0].track.name;
    axios({
      method: "get",
      withCredentials: false,
      url: "https://www.google.com/search?q=paris+lyrics",
    })
      .then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        $(".ujudUb", html).each((blockId, blockEl) => {
          $(blockEl).children().each((phraseId, phraseEl) => {
            // console.log($());
            setLyrics((lyr) => {
              console.log(lyr);
              return [...lyr, $(phraseEl).text()]
            })
          })
        });
      })
      .catch((er) => {
        console.log(er);
      });

    spotifyApi.play({
      uris: playlistUris,
      offset: {
        position: order,
      },
    });
  };

  return (
    <div>
      <div className="px-2 md:px-6 flex text-white flex-col space-y-1 pb-28">
        {playList?.tracks.items.map((track, index) => (
          <Song
            key={track.track.id}
            track={track.track}
            order={index}
            onClick={() => playSong(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Songs;
