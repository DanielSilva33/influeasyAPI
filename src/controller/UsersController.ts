import { CreateUsersService } from "../services/CreateUsersService";
import { Request, Response } from "express";

export class UsersController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const users = new CreateUsersService();

        const result = users.saveUsers({ name, email, password });

        if (result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result)
    }
}