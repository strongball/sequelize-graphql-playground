import { Resolver, Query, FieldResolver, Root, InputType, Field, ID, Mutation, Arg, Authorized } from "type-graphql";
import { Service, Inject } from "typedi";

import Member from "../databases/models/member.model";
import Book from "../databases/models/book.model";
import { MemberService } from "../services/member.service";
import { BookService } from "../services/book.service";
import { Loaders, DataLoaders } from "../decorators";
import { MaxLength } from "class-validator";

@InputType()
class BookInput {
    @Field({ description: "Max: 30" })
    @MaxLength(30)
    name: string;

    @Field(type => ID, { nullable: true })
    authorId: number;
}

@Service()
@Resolver(of => Book)
class BookResolver {
    @Inject()
    private memberService: MemberService;
    @Inject()
    private bookService: BookService;

    @Query(returns => [Book], { name: "books" })
    async books(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Authorized("Admin")
    @Mutation(returns => Book, { name: "createBook" })
    async createBook(@Arg("input") bookInput: BookInput): Promise<Book> {
        return this.bookService.createBook({
            name: bookInput.name,
            authorId: bookInput.authorId,
        });
    }

    @FieldResolver(type => Member, { nullable: true })
    async author(@Root() book: Book, @Loaders() dataLoaders: DataLoaders): Promise<Member | null> {
        return dataLoaders.members.load(book.authorId);
    }
}
