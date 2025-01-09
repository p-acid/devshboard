import { setupWorker } from "msw/browser";
import mswHandlers from "../handlers";

export const mockInBrowser = setupWorker(...mswHandlers);
