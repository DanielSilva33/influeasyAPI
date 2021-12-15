import { Request, Response } from "express";
import { CreateUsersService } from "../services/CreateUsersService";
import { GetAllUsersService } from "../services/GetAllUsersService";
import { GetUserByIdService } from "../services/GetUserByIdService";
import { DeleteUserService } from "../services/DeleteUserService";
import { UsersAuthService } from "../services/UsersAuthService";
import { SendEmailService } from "../services/SendEmailService";

export class UsersController {
    async saveUsers(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const users = new CreateUsersService();
        const sendMail = new SendEmailService();

        const result = await users.saveUsers({ name, email, password });

        if (result instanceof Error) {
            return response.status(400).json(result.message)
        }

        sendMail.sendMail({ name, email })
        return response.status(200).json(result)
    }

    async getAllUsers(request: Request, response: Response) {
        const users = new GetAllUsersService();

        const result = await users.getAllUsers();

        return response.status(200).json(result)
    }

    async getUsersById(request: Request, response: Response) {
        const { id } = request.params;

        const users = new GetUserByIdService();

        const result = await users.getUsersById({ id });

        return response.status(200).json(result)
    }

    async deleteUser(request: Request, response: Response) {
        const { id } = request.params;

        const users = new DeleteUserService();

        await users.deleteUser({ id });

        return response.status(200).json({ message: "User deleted" })
    }

    async loginUser(request: Request, response: Response) {
        const { email, password } = request.body;

        const users = new UsersAuthService();

        const result = await users.login({ email, password });

        if (result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.status(200).json(result)


    }

}