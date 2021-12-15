import { getRepository } from "typeorm";
import { Users } from "../entity/Users";

export class GetUserByIdService {
    async getUsersById({ id }) {
        const repo = getRepository(Users);

        if(!await repo.findOne({ id })) { 
            return new Error("Users not exists!")
        }

        const usersbyId = await repo.find({id});

        return usersbyId;
    }
}