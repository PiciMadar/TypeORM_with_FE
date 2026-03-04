import { UserService } from "../services/user.service";
import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";

export class UserController{
    constructor(private userService = new UserService()) {}

    createUser = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.createUser(name, email, hashedPassword);
        res.status(201).json(user);
    }

    listUsers = async (_req: Request, res: Response) => {
        const users = await this.userService.listUsers();
        res.status(200).json(users);
    }

    getUserById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const user = await this.userService.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const userData = req.body;
        const updatedUser = await this.userService.updateUser(id, userData);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        await this.userService.deleteUser(id);
        res.status(204).send();
    }

    listUserWithTasks = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const user = await this.userService.getUserById(id);
        if (user) {
            const tasks = await this.userService.listUserWithTasks(id);
            res.status(200).json({ user, tasks });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }
}