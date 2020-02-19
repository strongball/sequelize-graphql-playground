import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import { Service, Inject } from 'typedi';

import Member from '../databases/models/member.model';
import Book from '../databases/models/book.model';
import { MemberService } from '../services/member.service';
import { BookService } from '../services/book.service';

@Service()
@Resolver(of => Book)
class BookResolver {
    @Inject()
    private memberService: MemberService;
    @Inject()
    private bookService: BookService;

    @Query(returns => [Book], { name: 'books' })
    async books(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @FieldResolver(type => Member, { nullable: true })
    async author(@Root() book: Book): Promise<Member | null> {
        return this.memberService.find(book.authorId);
    }
}
