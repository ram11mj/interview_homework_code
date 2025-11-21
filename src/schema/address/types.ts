export type Address = {
  street: string;
  city: string;
  state: string;   // NEW FIELD
  zipcode: string;
};

export type Addresses = {
  [key: string]: Address;
};

export type Args = {
  username: string;
};