import { Service } from 'typedi';

import db from '../databases';
import Book from '../databases/models/book.model';
import { Op } from 'sequelize';
import { SortBydIds } from './utils';

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
        return SortBydIds(result, authorIds).map(item => item.books);
    }
}
