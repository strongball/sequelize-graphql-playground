import "reflect-metadata";

import * as Koa from "koa";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import { Container } from "typedi";
import { DataLoaderMiddleware } from "./middlewares/dataloader.middleware";
import db from "./databases";

import { authChecker } from "./auth";
(async () => {
    await db.sequelize.sync();
    const app = new Koa();
    // graphql
    const schema = buildSchemaSync({
        resolvers: [__dirname + "/resolvers/**/*.ts", __dirname + "/resolvers/**/*.js"],
        authChecker,
        container: Container,
        globalMiddlewares: [DataLoaderMiddleware],
        dateScalarMode: "isoDate",
    });

    const server = new ApolloServer({
        schema,
        context: ({ ctx }) => ctx,
    });
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
})();
