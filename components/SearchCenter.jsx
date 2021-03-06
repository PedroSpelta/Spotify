import { debounce } from "lodash";
import React, { useState, useCallback, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import Link from "next/link";
import axios from "axios";
import Artist from "./Artist";
import SearchSong from "./SearchSong";
import { SearchIcon } from "@heroicons/react/solid";

function SearchCenter() {
  const spotifyApi = useSpotify();
  const [searchInput, setSearchInput] = useState("");
  const [foundTracks, setFoundTracks] = useState([]);
  const [foundArtists, setFoundArtists] = useState([]);

  const onClick = (track) => {
    spotifyApi.play({
      uris: [track.uri],
    });
  };

  const onClickPlayback = (track) => {
    const { uri } = track;
    const token = spotifyApi.getAccessToken();
    axios({
      method: "post",
      url: `https://api.spotify.com/v1/me/player/queue?uri=${uri}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const searchInputDebounce = useCallback(
    debounce((searchInput) => {
      if (spotifyApi && searchInput !== "") {
        spotifyApi
          .searchTracks(searchInput, { limit: 5 })
          .then((data) => {
            const { items } = data.body.tracks;
            setFoundTracks(items);
          })
          .catch(() => {});
        spotifyApi
          .searchArtists(searchInput, { limit: 5 })
          .then((data) => {
            const { items } = data.body.artists;
            setFoundArtists(items);
          })
          .catch(() => {});
      }
    }, 500),
    []
  );

  useEffect(() => {
    searchInputDebounce(searchInput);
  }, [searchInput]);

  return (
    <div className="h-screen w-full overflow-y-scroll scrollbar-hide ml-7">
      <Link className="hidden" href={"/"}>
        <p className="md:hidden text-white">voltar</p>
      </Link>
      <div className="flex justify-center md:justify-start ml-[-28px] md:ml-0 relative">
        <input
          type="text"
          placeholder="Procurar uma música"
          className="w-[250px] h-[40px] rounded-full pl-12 pb-1 focus:outline-none md:w-[350px] mt-3"
          onChange={(e) => setSearchInput(e.target.value)}
          // style={{
          //   background:
          //     "url('https://www.iconpacks.net/icons/2/free-search-icon-2903-thumb.png') no-repeat",
          //   backgroundSize: "26px",
          //   backgroundColor: "white",
          //   backgroundPositionX: "10px",
          //   backgroundPositionY: "center",
          // }}
        />
        <SearchIcon className="absolute w-7 h-7 mt-[18px] ml-2 text-gray-700" />
      </div>

      {foundTracks.length > 0 ? (
        <p className="font-bold text-white text-2xl my-7">Músicas</p>
      ) : null}

      {foundTracks.map((track, i) => {
        return (
          <SearchSong
            key={i}
            order={i}
            track={track}
            onClick={() => {
              onClick(track);
            }}
            onClickPlayback={() => {
              onClickPlayback(track);
            }}
          />
        );
      })}
      {foundArtists.length > 0 ? (
        <p className="font-bold text-white text-2xl my-7 ">Artistas</p>
      ) : null}
      <div className="flex gap-7 overflow-hidden flex-wrap">
        {foundArtists.map((artist, i) => {
          return <Artist artist={artist} key={i} />;
        })}
      </div>
    </div>
  );
}

export default SearchCenter;
