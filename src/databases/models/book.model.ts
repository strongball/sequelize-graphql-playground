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
} from "sequelize-typescript";
import { ObjectType, Field, Int, ID } from "type-graphql";
import Member from "./member.model";

@Table({
    tableName: "books",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})
@ObjectType()
export default class Book extends Model<Book> {
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
        field: "author_id",
        type: DataType.INTEGER,
        allowNull: true,
    })
    authorId: number;

    @BelongsTo(() => Member, {
        foreignKey: "author_id",
        targetKey: "id",
    })
    @Field(type => Member, { nullable: true })
    author: Member;
}
