import { setupServer } from "msw/node";
import mswHandlers from "../handlers";

export const mockServer = setupServer(...mswHandlers);
