import { atom } from "recoil";

export const playerState = atom({
  key: "playerState",
  default: undefined,
});

export const webPlayerState = atom({
  key: "webPlayerState",
  default: undefined,
})