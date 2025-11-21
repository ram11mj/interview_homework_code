import { parse } from "graphql";
import { executor } from "../executor";

describe("Request ID Plugin", () => {

  test("Ensures requestId injected into context", async () => {
    const query = `query { _healthcheck }`;

    const res = await executor({
      document: parse(query),
      requestHeaders: { client: "web-app" }
    });

    expect(res.metadata.requestId).toBeDefined();
    expect(typeof res.metadata.requestId).toBe("string");
  });

});