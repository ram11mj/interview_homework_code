import { createYoga } from 'graphql-yoga';
import { genSchema } from '../schema/schema';
import plugins from '../envelop';

let yogaInstance: any = null;

/**
 * Builds (or returns cached) Yoga instance
 */
export const getYoga = async () => {
  if (!yogaInstance) {
    const schema = await genSchema();

    yogaInstance = createYoga({
      schema,
      maskedErrors: false,
      plugins,
    });
  }

  return yogaInstance;
};

/**
 * Test executor used in Jest test files
 */
export const executor = async ({
  document,
  variables = {},
  headers = {},
}: any) => {
  const yoga = await getYoga();

  const result = await yoga.execute({
    document,
    variableValues: variables,
    request: {
      headers: new Map(Object.entries(headers)),
    },
  });

  return result;
};