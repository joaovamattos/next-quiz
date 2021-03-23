import { Router } from "express";

// Controllers
import UserController from "../controllers/User/UserController";

const userController = new UserController();
const routes = Router();

// user routes
routes.get("/users", userController.index);
routes.get("/users/:id", userController.show);

export default routes;
