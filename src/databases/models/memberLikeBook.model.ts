import { Model, Column, Table, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";

import Book from "./book.model";
import Member from "./member.model";

@Table({
    tableName: "memberLikeBooks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})
export default class MemberLikeBook extends Model<MemberLikeBook> {
    @ForeignKey(() => Book)
    @Column({
        field: "book_id",
        type: DataType.BIGINT,
        allowNull: false,
    })
    bookId: number;

    @ForeignKey(() => Member)
    @Column({
        field: "member_id",
        type: DataType.BIGINT,
        allowNull: false,
    })
    memberId: number;

    @BelongsTo(() => Book, {
        foreignKey: "book_id",
        targetKey: "id",
    })
    book: Book;

    @BelongsTo(() => Member, {
        foreignKey: "member_id",
        targetKey: "id",
    })
    member: Member;
}
