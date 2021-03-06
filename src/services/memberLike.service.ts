import { Service } from "typedi";
import { Op } from "sequelize";

import db from "../databases";
import Book from "../databases/models/book.model";
import { groupByKeys } from "./utils";

@Service()
export class MemberLikeService {
    async findLikeBooksById(id: number): Promise<Book[]> {
        const result = await db.MemberLikeBook.findAll({
            include: [Book],
            where: {
                memberId: id,
            },
        });
        return result.map(item => item.book);
    }

    async findLikeBooksByIds(ids: number[] | readonly number[]): Promise<Book[][]> {
        const results = await db.MemberLikeBook.findAll({
            include: [Book],
            where: {
                memberId: {
                    [Op.in]: ids,
                },
            },
        });
        const groups = groupByKeys(results, ids, "memberId");

        return (ids as number[]).map(id => groups[id].map(item => item.book));
    }

    async likeBooks(memberId: number, bookId: number): Promise<void> {
        const data = await db.MemberLikeBook.findOne({
            where: {
                memberId,
                bookId,
            },
        });
        if (!data) {
            await db.MemberLikeBook.create({
                memberId,
                bookId,
            });
        }
    }
}
