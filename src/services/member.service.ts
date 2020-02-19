import db from '../databases';
import { Service } from 'typedi';

import Member from '../databases/models/member.model';
import Book from '../databases/models/book.model';
import MemberLikeBook from '../databases/models/memberLikeBook.model';

@Service()
export class MemberService {
    async find(id: number): Promise<Member | null> {
        return db.Member.findOne({
            where: { id: id },
        });
    }
    async findAll(): Promise<Member[]> {
        return db.Member.findAll();
    }
}
