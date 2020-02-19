import {
    Model,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Table,
    HasMany,
    BelongsTo,
    HasOne,
    BelongsToMany,
} from 'sequelize-typescript';
import { ObjectType, Field, Int, ID } from 'type-graphql';
import Book from './book.model';
import MemberLikeBook from './memberLikeBook.model';

@Table({
    tableName: 'members',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
@ObjectType()
export default class Member extends Model<Member> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    @Field(type => ID)
    id: number;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    @Field()
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    @Field()
    age: number;

    @HasMany(() => Book, {
        foreignKey: 'author_id',
    })
    @Field(type => [Book], { nullable: true })
    books: Book[];

    // @BelongsToMany(
    //     () => Book,
    //     () => MemberLikeBook,
    // )
    // likeBooks: MemberLikeBook[];

    @Field(type => [Book], { nullable: true })
    likeBooks: Book[];
}
