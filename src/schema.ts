import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";

export const genSchema = async () => {
  // Load all *.graphql files inside src/schema/**
  const typeDefs = loadFilesSync(
    path.join(__dirname, "../schema/**/*.graphql")
  );

  // Load all resolver files (resolvers.ts)
  const resolverFiles = loadFilesSync(
    path.join(__dirname, "../schema/resolvers.?s")
  );

  const resolvers = mergeResolvers(resolverFiles);

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};