import React, { useState } from "react";

function SearchCenter() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="h-screen w-full overflow-y-scroll scrollbar-hide">
      {searchInput}
      <input
        type="text"
        placeholder="Procurar uma música"
        className="w-[350px] h-[40px] rounded-full pl-7 pb-1"
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}

export default SearchCenter;
