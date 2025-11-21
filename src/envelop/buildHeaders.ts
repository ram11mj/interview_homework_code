import type { Plugin } from '@envelop/core';
import { v4 as uuid } from 'uuid';
import { GraphQLError } from 'graphql';
import { ContextType } from '../types';

export const buildHeaders = (): Plugin<ContextType> => {
  return {
    onExecute({ context, extendContext }) {
      // ---- Ticket 4: Generate requestId ----
      const requestId = uuid();

      // ---- Ticket 3: Required "client" header ----
      const client = context.request?.headers?.get("client");

      if (!client) {
        throw new GraphQLError("Missing required 'client' header");
      }

      // Add both to context
      extendContext({
        requestId,
        client,
      });
    },
  };
};