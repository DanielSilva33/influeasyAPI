import { Request, Response } from "express";
import { CreateUsersService } from "../services/UserService/CreateUsersService";
import { GetAllUsersService } from "../services/UserService/GetAllUsersService";
import { GetUserByIdService } from "../services/UserService/GetUserByIdService";
import { DeleteUserService } from "../services/UserService/DeleteUserService";
import { UsersAuthService } from "../services/UserService/UsersAuthService";
import { UpdateUserService } from "../services/UserService/UpdateUserService";
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

    async updateUsers(request: Request, response: Response) {
        const { name, email, password } = request.body;
        const { id } = request.params;

        const users = new UpdateUserService();

        const result = await users.updateUsers({ id, name, email, password });

        if (result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.status(200).json(result)
    }


}