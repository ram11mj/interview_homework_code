import { parse } from "graphql";
import { executor } from "../executor";

describe("Client Header Plugin", () => {

  test("Error when client header missing", async () => {
    const query = `
      query {
        _healthcheck
      }
    `;

    const result = await executor({
      document: parse(query),
      variables: {}
    });

    expect(result.errors?.[0].message).toBe("Missing required client header");
  });

  test("Success when client header provided", async () => {
    const query = `
      query {
        _healthcheck
      }
    `;

    const result = await executor({
      document: parse(query),
      requestHeaders: { client: "api" }
    });

    expect(result.metadata.requestId).toBeDefined();
  });

});