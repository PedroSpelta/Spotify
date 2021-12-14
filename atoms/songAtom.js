import { atom } from "recoil";
const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});

export const currentTrack = atom({
  key:"currentTrack",
  default: track,
})

export const isPaused = atom({
  key: "isPaused",
  default: true,
})

export const isActive = atom({
  key: "isActive",
  default: false,
})