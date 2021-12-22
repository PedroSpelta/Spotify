import React from "react";
import { useDataContext } from "../context/data";

function Lyrics() {
  const { lyrics } = useDataContext();
  return (
    <div className="text-white font-thin bg-purple-600 lyric-font text-4xl flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col items-center justify-center pt-5 m-auto">
        {lyrics.map((block, i) => (
          <div className="flex flex-col items-center py-10" key={i}>
            {block.map((line, i) => (
              <p className="text-center py-3 leading-tight" key={i}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lyrics;
