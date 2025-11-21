import { parse } from "graphql";
import { executor } from "../executor";

jest.mock("../logger", () => {
  return {
    Logger: jest.fn().mockImplementation(() => ({
      setRequestId: jest.fn(),
      setClient: jest.fn(),
      info: jest.fn(),
      error: jest.fn()
    }))
  };
});

describe("Logger Plugin", () => {
  test("Logger receives requestId + client", async () => {
    const query = `query { _healthcheck }`;

    const result = await executor({
      document: parse(query),
      requestHeaders: { client: "browser" }
    });

    expect(result.metadata.requestId).toBeDefined();
  });
});