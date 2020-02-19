import db from './databases';

(async () => {
    await db.sequelize.sync();
    const firstUser = await db.Member.create({
        name: '大作家',
    });

    await db.Book.create({
        name: '第一本書',
        author_id: firstUser.id,
    });
    await db.Book.create({
        name: '第二本書',
        author_id: firstUser.id,
    });
})();
