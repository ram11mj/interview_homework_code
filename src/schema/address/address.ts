import fs from 'fs';
import path from 'path';
import { GraphQLError } from 'graphql';

import { Addresses, Address, Args, CreateAddressArgs } from './types';

/* -------------------------------------------------------
   Always load latest JSON (fix for Node JSON-cache issue)
-------------------------------------------------------- */
const loadAddresses = (): Addresses => {
  const filePath = path.join(__dirname, '../../../data/addresses.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

/* -------------------------------------------------------
   Helper: Get address by username
-------------------------------------------------------- */
const _getAddress = (username: string): Address | null => {
  const addresses = loadAddresses();
  return addresses[username] ?? null;
};

/* -------------------------------------------------------
   Query: address(username)
-------------------------------------------------------- */
export const getAddress = (_: any, args: Args, context: any): Address => {
  context.logger.info('getAddress', { message: 'Enter resolver' });

  const address = _getAddress(args.username);

  if (!address) {
    context.logger.error('getAddress', { message: 'No address found' });
    throw new GraphQLError('No address found in getAddress resolver');
  }

  context.logger.info('getAddress', { message: 'Returning address' });
  return address;
};

/* -------------------------------------------------------
   Mutation: createAddress(username, address)
   Ticket 2 – Create, do not overwrite existing records
-------------------------------------------------------- */
export const createAddress = (
  _: any,
  args: CreateAddressArgs,
  context: any
): Address => {
  context.logger.info('createAddress', { message: 'Enter resolver' });

  const { username, address } = args;

  // Reload latest file content before writing
  const addresses = loadAddresses();

  // Prevent overwrites (required by Ticket 2)
  if (addresses[username]) {
    context.logger.warn('createAddress', {
      message: `Username "${username}" already exists`,
    });
    throw new GraphQLError(
      `Address for username "${username}" already exists`
    );
  }

  // Add new record
  addresses[username] = address;

  // Persist to file
  const filePath = path.join(__dirname, '../../../data/addresses.json');
  fs.writeFileSync(filePath, JSON.stringify(addresses, null, 2));

  context.logger.info('createAddress', {
    message: 'Address successfully created',
  });

  return address;
};