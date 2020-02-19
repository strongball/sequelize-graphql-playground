import { Sequelize } from 'sequelize-typescript';
import Book from './models/book.model';
import Member from './models/member.model';
import MemberLikeBook from './models/memberLikeBook.model';

import * as pg from 'pg';
pg.defaults.parseInt8 = true;

const opts = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'ball',
    password: process.env.DB_PASSWORD || '1234',
    dialect: 'postgres',
    pool: {
        min: 0,
        max: 10,
        idle: 10000,
    },
    timezone: '+08:00',
};

const sequelize = new Sequelize({
    // name: opts.db,
    host: opts.host,
    username: opts.user,
    password: opts.password,
    dialect: 'postgres',
    pool: opts.pool,
    timezone: opts.timezone,
    modelPaths: [__dirname + '/models/**/*.model.*'],
    logging: sql => {
        console.log('Query');
    },
});

export default {
    sequelize,
    Member,
    Book,
    MemberLikeBook,
};
