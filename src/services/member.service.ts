import { Service } from "typedi";
import { Op } from "sequelize";

import db from "../databases";
import Member from "../databases/models/member.model";
import { sortByKeys } from "./utils";

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
    async findAllByIds(ids: number[] | readonly number[]): Promise<Member[]> {
        const result = await db.Member.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        });
        return sortByKeys(result, ids);
    }
}
