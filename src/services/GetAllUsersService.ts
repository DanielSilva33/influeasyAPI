import { getRepository } from "typeorm";
import { Users } from "../entity/Users";


export class GetAllUsersService {
    async getAllUsers() {
        const repo = getRepository(Users);

        const result = await repo.find();

        return result;
    }
}