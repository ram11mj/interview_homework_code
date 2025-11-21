import { getAddress } from './address';
import { createAddress } from './mutations';

export const resolvers = {
  Query: {
    address: getAddress,
  },
  Mutation: {
    createAddress,
  },
};