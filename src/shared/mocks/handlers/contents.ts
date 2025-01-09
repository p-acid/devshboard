import { http, HttpResponse } from "msw";

export const contentsHandlers = [
  http.get("http://localhost:4000/contents", () => {
    return HttpResponse.json([
      {
        id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
        title: "Getting started",
        description: "Three steps to get started with Mock Service Worker.",
      },
    ]);
  }),
];
