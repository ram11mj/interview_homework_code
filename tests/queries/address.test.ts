import { parse } from "graphql";
import { executor } from "../types/executor";

describe("Client Header & Metadata Tests", () => {

  test("Fails when missing client header", async () => {
    const query = `query { address(username: "jack") { city } }`;

    const result = await executor({
      document: parse(query)
    });

    expect(result.errors[0].message).toBe(
      "Missing required 'client' header"
    );
  });


  test("Succeeds when client header provided", async () => {
    const query = `
      query {
        address(username: "jack") {
          city
        }
      }
    `;

    const result = await executor({
      document: parse(query),
      headers: { client: "unit-test" }
    });

    expect(result.data.address.city).toBe("Sometown");
    expect(result.metadata.requestId).toBeDefined();
  });


  test("requestId is different for every request", async () => {
    const query = `query { address(username: "jack") { city } }`;

    const r1 = await executor({
      document: parse(query),
      headers: { client: "unit-test" }
    });

    const r2 = await executor({
      document: parse(query),
      headers: { client: "unit-test" }
    });

    expect(r1.metadata.requestId).not.toBe(r2.metadata.requestId);
  });

});