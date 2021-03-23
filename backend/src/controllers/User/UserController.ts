import { Request, Response } from "express";

import User from "../../models/User";
import Quiz from "../../models/Quiz";

class UserController {
  async index(req: Request, res: Response) {
    const users = await User.find();

    return res.status(200).json(users);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const quizes = await Quiz.find({ user_id: id });

    return res.json({ user, quizes });
  }
}

export default UserController;
