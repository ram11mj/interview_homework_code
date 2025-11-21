import { Logger } from '../logger';

export type ContextType = {
  requestId?: string;
  logger?: any;
  client?: string;  // <- Ticket 3
};
