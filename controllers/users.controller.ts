import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    where: { status: 1 },
  });
  if (!users) {
    res.status(404).json({ msg: `There are not users on database` });
  } else {
    res.json(users);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json({ msg: `The user id ${id} does not exist` });
  } else {
    res.json(user);
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const existMail = await User.findOne({
      where: {
        mail: body.mail,
      },
    });

    if (existMail) {
      return res.status(400).json({
        msg: `The email ${body.mail} already exists`,
      });
    }

    const newUser = await User.create(body);
    res.json({ newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Contact to Admin`,
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        msg: `User with id ${id} not found`,
      });
    }
    const existMail = await User.findOne({
      where: {
        mail: body.mail,
      },
    });

    if (existMail) {
      return res.status(400).json({
        msg: `The email ${body.mail} already exists`,
      });
    }

    await user.update(body);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Contact to Admin`,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(400).json({
      msg: `User with id ${id} not found`,
    });
  }

  await user.update({status: false})
  //await user.destroy();
  res.json({
    msg: `User deleted`,
  });
};
