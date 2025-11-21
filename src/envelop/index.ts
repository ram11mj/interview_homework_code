import { Plugin, useEngine } from '@envelop/core';
import { parse, validate, specifiedRules, execute, subscribe } from 'graphql';
import { useParserCache } from '@envelop/parser-cache';
import { useValidationCache } from '@envelop/validation-cache';

import { buildHeaders } from './buildHeaders';
import { useLogger } from './useLogger';
import { useResponseMetadata } from './responseMetadata';

import { ContextType } from '../types';

const plugins: Plugin<ContextType>[] = [

  // GraphQL engine
  useEngine({
    parse,
    validate,
    specifiedRules,
    execute,
    subscribe,
  }) as Plugin<ContextType>,

  // Ticket 3 & 4 – validate client + generate requestId
  buildHeaders(),

  // Ticket 5 – logger needs requestId AND client
  useLogger(),

  // Performance plugins
  useParserCache() as Plugin<ContextType>,
  useValidationCache() as Plugin<ContextType>,

  // Ticket 6 – append metadata.requestId to response
  useResponseMetadata(),
];

export default plugins;