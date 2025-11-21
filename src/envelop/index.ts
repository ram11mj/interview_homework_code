import type { Plugin } from '@envelop/core';
import { useEngine } from '@envelop/core';
import { parse, validate, specifiedRules, execute, subscribe } from 'graphql';
import { useParserCache } from '@envelop/parser-cache';
import { useValidationCache } from '@envelop/validation-cache';

import { buildHeaders } from './buildHeaders';          
import { useLogger } from './useLogger';                
import { validateClientHeader } from './validateClient'; 
import { useResponseMetadata } from './responseMetadata'; 

import { ContextType } from '../types';

const plugins: Plugin<ContextType>[] = [

  useEngine({
    parse,
    validate,
    specifiedRules,
    execute,
    subscribe,
  }) as Plugin<ContextType>,
  validateClientHeader(),
  buildHeaders(),
  useLogger(),
  useParserCache() as Plugin<ContextType>,
  useValidationCache() as Plugin<ContextType>,
  useResponseMetadata(),
];

export default plugins;