export const mockClient = async () => {
  if (typeof window !== "undefined") {
    const { mockInBrowser } = await import("./mock-in-browser");

    mockInBrowser.start();
  }
};
