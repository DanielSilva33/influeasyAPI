import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";
import * as emailValidator from "email-validator"; 
import * as bcrypt from "bcrypt";

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
        if(!emailValidator.validate(email)) {
            return new Error("Invalid email");
        }

        const passwordHash = await bcrypt.hash(password, 8);

        const user = repo.create({
            name,
            email,
            password: passwordHash
        });

        repo.save(user);

        return user;
    }
}