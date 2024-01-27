import type { Page } from "@hischoolhu/cms";

const url = import.meta.env.DEV
  ? "http://127.0.0.1:3000"
  : `${import.meta.env.PAYLOAD_URL}`;

export const getPages = (): Promise<Page[]> =>
  fetch(`${url}/api/pages`)
    .then((res) => res.json())
    .then((res) => res.docs);

export const getImageSrc = (src: string) => `${url}/media/${src}`;
