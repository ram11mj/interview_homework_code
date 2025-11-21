export type Address = {
  street: string;
  city: string;
  state: string;   // Ticket 1
  zipcode: string;
};

export type Addresses = {
  [username: string]: Address;
};

/** Args for Query: address(username) */
export type Args = {
  username: string;
};

/** Input type for Mutation: AddressInput */
export type AddressInput = {
  street: string;
  city: string;
  state: string;   // Ticket 1
  zipcode: string;
};

/** Args for Mutation: createAddress(username, address) */
export type CreateAddressArgs = {
  username: string;
  address: AddressInput;
};