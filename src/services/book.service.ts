import { Service } from "typedi";

import db from "../databases";
import Book from "../databases/models/book.model";
import { Op } from "sequelize";
import { sortByKeys } from "./utils";

interface BookParams {
    name: string;
    authorId: number;
}

@Service()
export class BookService {
    async find(id: string): Promise<Book | null> {
        return db.Book.findOne({
            where: { id: id },
        });
    }
    async findAll(): Promise<Book[]> {
        return db.Book.findAll();
    }
    async findAllByAuthorIds(authorIds: number[] | readonly number[]): Promise<Book[][]> {
        const result = await db.Member.findAll({
            include: [Book],
            where: {
                id: {
                    [Op.in]: authorIds,
                },
            },
        });
        return sortByKeys(result, authorIds).map(item => item.books);
    }
    async createBook(params: BookParams): Promise<Book> {
        const book = db.Book.build({
            name: params.name,
            authorId: params.authorId,
        });
        await book.save();
        return book;
    }
}
