import { Router } from "express";

// Controllers
import QuizController from "../controllers/Quiz/QuizController";
import ScoreController from "../controllers/Quiz/ScoreController";

const quizController = new QuizController();
const scoreController = new ScoreController();
const routes = Router();

// quiz routes
routes.post("/quizes", quizController.store);
routes.get("/quizes", quizController.index);
routes.put("/quizes/:id", quizController.update);
routes.get("/quizes/:id", quizController.show);
routes.delete("/quizes/:id", quizController.destroy);

// score routes
routes.put("/scores/:id", scoreController.update);
routes.get("/scores/:id", scoreController.show);

export default routes;
