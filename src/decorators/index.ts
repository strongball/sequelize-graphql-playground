import { createParamDecorator } from "type-graphql";
import { Context } from "koa";

export { DataLoaders } from "../dataloader";
export function Loaders() {
    return createParamDecorator<Context>(({ context }) => context.dataLoaders);
}
