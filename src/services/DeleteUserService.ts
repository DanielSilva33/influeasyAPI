import { getRepository } from "typeorm";
import { Users } from "../entity/Users";


export class DeleteUserService {
    async deleteUser({ id }) {
        const repo = getRepository(Users);

        const result = await repo.delete({ id });

        return result;
    }
}