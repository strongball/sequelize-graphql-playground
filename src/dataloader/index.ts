import Container, { Service, Inject } from "typedi";
import DataLoader = require("dataloader");

import Book from "../databases/models/book.model";

import { MemberService } from "../services/member.service";
import { BookService } from "../services/book.service";
import { MemberLikeService } from "../services/memberLike.service";
import Member from "../databases/models/member.model";

export type DataLoaders = DataLoaderFactory extends { genLoaders: () => infer R } ? R : undefined;
@Service()
export class DataLoaderFactory {
    @Inject()
    private memberService: MemberService;
    @Inject()
    private memberLikeService: MemberLikeService;
    @Inject()
    private bookService: BookService;

    genLoaders() {
        return {
            members: new DataLoader<number, Member>(keys => {
                return this.memberService.findAllByIds(keys);
            }),
            memberBooks: new DataLoader<number, Book[]>(keys => {
                return this.bookService.findAllByAuthorIds(keys);
            }),
            memberLikeBooks: new DataLoader<number, Book[]>(keys => {
                return this.memberLikeService.findLikeBooksByIds(keys);
            }),
        };
    }
}
