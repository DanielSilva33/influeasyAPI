import { Router } from "express";
import { UsersController } from "../controller/UsersController";

const routes = Router();

routes.post("/users", new UsersController().handle);

export default routes;