import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const auth = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: "Token is required!"})
    }

    const [ ,token ] = authHeader.split(" ");

    try {
        jwt.verify(token, process.env.APP_PASS)
        next()

    } catch (error) {
        return response.status(401).json({ message: "Token is required!"})
    }
}