import { Router } from "express";

import quizRoutes from "./quiz.routes";
import userRoutes from "./user.routes";
const routes = Router();

routes.use(quizRoutes);
routes.use(userRoutes);

export default routes;
