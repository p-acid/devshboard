import { mockServer } from "../../__tests__/mocks/mock-server";

export const enableMock = () => mockServer.listen();

enableMock();
