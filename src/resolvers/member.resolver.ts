import { Resolver, Query, FieldResolver, Root, Ctx } from 'type-graphql';
import { Service, Inject } from 'typedi';
import { Context } from 'koa';

import Member from '../databases/models/member.model';
import Book from '../databases/models/book.model';
import { MemberService } from '../services/member.service';
import { MemberLikeService } from '../services/memberLike.service';

@Service()
@Resolver(of => Member)
class MemberResolver {
    @Inject()
    private memberService: MemberService;
    @Inject()
    private memberLikeService: MemberLikeService;

    @Query(returns => [Member], { name: 'members' })
    async members(): Promise<Member[]> {
        return this.memberService.findAll();
    }

    @FieldResolver(type => [Book], { nullable: 'itemsAndList' })
    async books(@Ctx() { dataLoaders }: Context, @Root() member: Member): Promise<Book[]> {
        return dataLoaders.memberBooks.load(member.id);
    }

    @FieldResolver(type => [Book], { nullable: 'itemsAndList' })
    async likeBooks(@Ctx() { dataLoaders }: Context, @Root() member: Member): Promise<Book[]> {
        return dataLoaders.memberLikeBooks.load(member.id);
    }
}
