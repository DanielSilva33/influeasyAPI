import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

type IUsersRequest = {
    email: string;
    password: string;
}
export class UsersAuthService {
    async login({ email, password }: IUsersRequest) {
        const repo = getRepository(Users);

        const users = await repo.find({
            where: {
                email
            }
        });

        if (users.length === 1) {
            if (await bcrypt.compare(password, users[0].password)) {
                
                const token = jwt.sign({ id: users[0].id}, process.env.APP_PASS, {
                    expiresIn: "1d"
                });

                const data = {
                    id: users[0].id,
                    name: users[0].name,
                    email: users[0].email,
                    token
                }

                return data;
            } else {
                return new Error("User not found");
            }
        } else {
            return new Error("User not found");
        }

    }
}