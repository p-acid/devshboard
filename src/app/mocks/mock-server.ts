import mswHandlers from "@/shared/mocks/handlers";
import { setupServer } from "msw/node";

export const mockServer = setupServer(...mswHandlers);
