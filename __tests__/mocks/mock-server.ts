import { setupServer } from "msw/node";
import mswHandlers from ".";

export const mockServer = setupServer(...mswHandlers);
