import { DataLoaders } from '../dataloader';

declare module 'koa' {
    interface Context {
        dataLoaders: DataLoaders;
    }
}
