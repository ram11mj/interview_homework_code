import { createServer } from 'node:http';
import { genSchema } from './schema';
import { createYoga } from 'graphql-yoga';
import plugins from '../envelope';   // <-- FIXED PATH

const yogaPort = 4000;

(async () => {
  const schema = await genSchema();

  const yoga = createYoga({
    schema,
    plugins,
    maskedErrors: false,
  });

  const server = createServer(yoga);

  server.listen(yogaPort, () => {
    console.log(`Server listening at http://localhost:${yogaPort}/graphql`);
  });
})();