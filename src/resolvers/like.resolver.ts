import { Resolver, Mutation, Arg } from 'type-graphql';
import { Service, Inject } from 'typedi';

import { MemberLikeService } from '../services/memberLike.service';

@Service()
@Resolver()
class LikeResolver {
    @Inject()
    private memberLikeService: MemberLikeService;

    @Mutation(returns => Boolean, { name: 'likeBook' })
    async likeBook(@Arg('memberId') memberId: number, @Arg('bookId') bookId: number) {
        await this.memberLikeService.likeBooks(memberId, bookId);
        return true;
    }
}
