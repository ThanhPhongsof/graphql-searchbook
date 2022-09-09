const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

// Load schema & resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// Load db methods
const mongoDataMethods = require("./data/db");

// Connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://phong:123456a@cluster0.jslhjoc.mongodb.net/?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
      }
    );
    console.log("Mongoose connect");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

async function startApolloServer(typeDefs, resolvers) {
  // Same ApolloServer initialization as before
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods }),
  });

  // Required logic for integrating with Express
  await server.start();

  const app = express();

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
