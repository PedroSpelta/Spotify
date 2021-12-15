import React, { useState } from "react";

function SearchCenter() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="h-screen w-full overflow-y-scroll scrollbar-hide">
      {searchInput}
      <div className="">
        <input
          type="text"
          placeholder="Procurar uma música"
          className="w-[350px] h-[40px] rounded-full pl-12 pb-1 focus:outline-none"
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            background:
              "url('https://www.iconpacks.net/icons/2/free-search-icon-2903-thumb.png') no-repeat",
            backgroundSize: "26px",
            backgroundColor: "white",
            backgroundPositionX:"10px",
            backgroundPositionY: "center",
          }}
        ></input>
      </div>
    </div>
  );
}

export default SearchCenter;
