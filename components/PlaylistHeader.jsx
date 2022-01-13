import React from "react";

function PlaylistHeader({ img, label, name, color,children }) {
  return (
    <section
      className={`flex items-end space-x-7 bg-gradient-to-b to-[#141414] ${color} h-80 text-white p-8`}
    >
      {children}
      <div>
        <p>{label}</p>
        <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{name}</h1>
      </div>
    </section>
  );
}

export default PlaylistHeader;
