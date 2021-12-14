import { getRepository } from "typeorm";
import { Users } from "../entity/Users";

type IUsersRequest = {
    name: string;
    email: string;
    password: string;
}
export class CreateUsersService {
    async saveUsers({ name, email, password }: IUsersRequest): Promise<Users | Error> {
        const repo = getRepository(Users);

        if(await repo.findOne({ email })) { 
            return new Error("Users already exists!")
        }

        const user = repo.create({
            name,
            email,
            password
        });

        repo.save(user);

        return user;
    }
}