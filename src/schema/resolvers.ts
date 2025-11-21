import { getAddress, createAddress } from './address';

export const resolvers = {
  Query: {
    address: getAddress,
  },
  Mutation: {
    createAddress,
  },
};