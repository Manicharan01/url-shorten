import { atom } from "recoil";

export interface URL {
  id: string;
  url: string;
  shortUrl: string;
  createdAt: Date;
  updatedAt: Date;
  count: number;
}

export const urlState = atom<URL>({
  key: "urlState",
  default: {
    id: "",
    url: "",
    shortUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    count: 0,
  },
});
