import { Router } from "express";
import { UsersController } from "../controller/UsersController";

const routes = Router();

routes.get("/users", new UsersController().getAllUsers);
routes.get("/users/:id", new UsersController().getUsersById);
routes.post("/users", new UsersController().saveUsers);
routes.post("/login", new UsersController().loginUser);
routes.put("/users/:id", new UsersController().updateUsers);
routes.delete("/users/:id", new UsersController().deleteUser);

export default routes;