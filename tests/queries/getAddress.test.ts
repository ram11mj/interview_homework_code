import { parse } from 'graphql';
import { executor } from '../executor';

describe("getAddress Query", () => {

  test("Success", async () => {
    const query = `
      query GetAddress($username: String!) {
        address(username: $username) {
          street
          city
          zipcode
        }
      }
    `;

    const variables = { username: "jack" };

    const result = await executor({
      document: parse(query),
      variables,
      requestHeaders: { client: "web-app" }
    });

    expect(result.data.address).toEqual({
      street: "123 Street St.",
      city: "Sometown",
      zipcode: "43215",
    });

    expect(result.metadata.requestId).toBeDefined();
  });

  test("Error - no address found", async () => {
    const query = `
      query GetAddress($username: String!) {
        address(username: $username) {
          street
          city
          zipcode
        }
      }
    `;

    const variables = { username: "unknown_user" };

    const result = await executor({
      document: parse(query),
      variables,
      requestHeaders: { client: "web-app" }
    });

    expect(result.errors?.[0].message).toBe("No address found in getAddress resolver");
  });

});