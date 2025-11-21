import addressesData from '../../../data/addresses.json';
import fs from 'fs';
import path from 'path';
import { Address } from './types';
import { GraphQLError } from 'graphql';

const filePath = path.join(__dirname, '../../../data/addresses.json');

export const createAddress = async (
  _: any,
  args: any,
  context: any
): Promise<Address> => {
  context.logger.info('createAddress - start');

  const addresses = addressesData as any;

  if (addresses[args.username]) {
    throw new GraphQLError(`Address already exists for user ${args.username}`);
  }

  const newAddress: Address = {
    street: args.street,
    city: args.city,
    state: args.state,
    zipcode: args.zipcode,
  };

  addresses[args.username] = newAddress;

  fs.writeFileSync(filePath, JSON.stringify(addresses, null, 2));

  context.logger.info('createAddress - saved');

  return newAddress;
};