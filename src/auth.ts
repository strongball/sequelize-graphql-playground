import { AuthChecker } from "type-graphql";
import { Context } from "koa";

export const authChecker: AuthChecker<Context> = ({ root, args, context, info }, roles) => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    const token = context.req.headers["authorization"] || "";
    console.log(args);
    return token === "1234"; // or false if access is denied
};
