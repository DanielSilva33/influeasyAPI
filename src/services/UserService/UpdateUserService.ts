import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";
import * as emailValidator from "email-validator"; 
import * as bcrypt from "bcrypt";

type IUsersRequest = {
    id: string;
    name: string;
    email: string;
    password: string;
}
export class UpdateUserService {
    async updateUsers({ id, name, email, password }: IUsersRequest): Promise<Users | Error> {
        const repo = getRepository(Users);

        const users = await repo.findOne({ id });

        if (!users) {
            return new Error("User not found!")
        }

        if(!emailValidator.validate(email)) {
            return new Error("Invalid email");
        }

        users.name = name ? name : users.name;
        users.email = email ? email : users.email;
        users.password = password ? password : users.password;
        
        const passwordHash = await bcrypt.hash(password, 8);


        repo.save(users);

        return users;
    }
}