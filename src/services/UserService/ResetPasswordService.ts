import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";
import { v4 as uuid} from "uuid";


export class ResetPasswordService {
    async resetPassword({ id }): Promise<Users | Error> {
        const repo = getRepository(Users);

        const users = await repo.findOne({ id });

        if (!users) {
            return new Error("User not found!")
        }

        const password = uuid();


        users.name = users.name;
        users.email = users.email;
        users.password = password;

        repo.save(users);

        return users;
    }
}