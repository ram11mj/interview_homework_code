import type { Plugin } from '@envelop/core';
import { Logger } from '../logger';
import { ContextType } from '../types';

export const useLogger = (): Plugin<ContextType> => {
  return {
    onExecute({ context, extendContext }) {
      const logger = new Logger();

      // Attach requestId
      if (context.requestId) {
        logger.setRequestId(context.requestId);
      }

      // Ticket 5: Attach required client header
      if (context.client) {
        logger.setClient(context.client);
      }

      extendContext({ logger });
    },
  };
};