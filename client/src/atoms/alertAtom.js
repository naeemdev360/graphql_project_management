import { atom } from "recoil";

export const alertState = atom({
  key: "alertState",
  default: {
    show: false,
    message: "Are you sure?",
    btnRef: null,
    confirm() {},
  },
});
