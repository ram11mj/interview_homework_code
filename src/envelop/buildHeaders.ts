import type { Plugin } from '@envelop/core';
import { v4 as uuid } from 'uuid';
import { GraphQLError } from 'graphql';
import { ContextType } from '../types';

export const buildHeaders = (): Plugin<ContextType> => {
  return {
    onExecute({ extendContext, context }) {
      // Ticket 4 → always generate requestId
      const requestId = uuid();

      // Ticket 3 → validate required "client" header
      const client = context?.request?.headers?.get('client');

      if (!client) {
        throw new GraphQLError("Missing required 'client' header");
      }

      // Add both to the execution context
      extendContext({
        requestId,
        client,
      });
    },
  };
};