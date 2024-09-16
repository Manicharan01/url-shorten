import { selector } from "recoil";
import { URL, urlState } from "@/store/atoms/url";

export const urlDetails = selector<URL>({
  key: "urlDetails",
  get: ({ get }) => {
    const url = get(urlState);

    return url;
  },
});
