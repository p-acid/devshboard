import { describe, test } from "vitest";
import { mockServer } from "../__tests__/mocks/mock-server";

mockServer.listen();

describe("msw", () => {
  test("get", async () => {
    const res = await fetch("http://localhost:4000/contents");
    const data = await res.json();

    console.log(data);
  });
});
