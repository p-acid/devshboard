import { setupWorker } from "msw/browser";
import mswHandlers from ".";

export const mockInBrowser = setupWorker(...mswHandlers);
