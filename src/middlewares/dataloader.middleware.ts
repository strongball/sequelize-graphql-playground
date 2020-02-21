import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
// import DataLoader = require('dataloader');
import { Context } from "koa";
import { Service, Inject } from "typedi";

// import Book from '../databases/models/book.model';
import { DataLoaderFactory } from "../dataloader";
@Service()
export class DataLoaderMiddleware implements MiddlewareInterface<Context> {
    @Inject()
    private dataLoaderFactory: DataLoaderFactory;
    async use({ context }: ResolverData<Context>, next: NextFn) {
        if (!context.dataLoaders) {
            // context.dataLoaders = {
            //     memberBooks: new DataLoader<number, Book[]>(keys => {
            //         return this.bookService.findAllByAuthorIds(keys);
            //     }),
            // };
            context.dataLoaders = this.dataLoaderFactory.genLoaders();
        }
        return next();
    }
}
