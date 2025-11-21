import { parse } from "graphql";
import { executor } from "../executor";
import fs from "fs";

describe("createAddress Mutation", () => {

  const newUser = "superman";

  afterEach(() => {
    // reset JSON file after test
    const addresses = JSON.parse(fs.readFileSync("./data/addresses.json", "utf8"));
    delete addresses[newUser];
    fs.writeFileSync("./data/addresses.json", JSON.stringify(addresses, null, 2));
  });

  test("Success - create new address", async () => {
    const mutation = `
      mutation CreateAddress($username: String!, $address: AddressInput!) {
        createAddress(username: $username, address: $address) {
          street
          city
          zipcode
          state
        }
      }
    `;

    const variables = {
      username: newUser,
      address: {
        street: "7 Hero Road",
        city: "Metropolis",
        zipcode: "45454",
        state: "NY"
      },
    };

    const result = await executor({
      document: parse(mutation),
      variables,
      requestHeaders: { client: "mobile-app" }
    });

    expect(result.data.createAddress).toEqual(variables.address);
    expect(result.metadata.requestId).toBeDefined();
  });

  test("Error - duplicate username", async () => {
    const mutation = `
      mutation CreateAddress($username: String!, $address: AddressInput!) {
        createAddress(username: $username, address: $address) {
          street
          city
          zipcode
          state
        }
      }
    `;

    const variables = {
      username: "jack", // already exists
      address: {
        street: "Fake",
        city: "Fake",
        zipcode: "00000",
        state: "XX",
      },
    };

    const result = await executor({
      document: parse(mutation),
      variables,
      requestHeaders: { client: "mobile-app" }
    });

    expect(result.errors?.[0].message).toContain("Address already exists");
  });

});