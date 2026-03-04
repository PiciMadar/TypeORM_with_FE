import { Request, Response } from "express";
import { TaskService } from "../services/task.service";


export class TaskController {
    constructor(private taskService = new TaskService()) {
    }

    createTask = async (req: Request, res: Response) => {
        const { title, description, userId } = req.body;
        const task = await this.taskService.createTask(title, description, userId);
        res.status(201).json(task);
    }

    listTasks = async (req: Request, res: Response) => {
        const tasks = await this.taskService.listTasks();
        res.status(200).json(tasks);
    }

    getTaskById = async (req: Request, res: Response) => {
        const  id  = req.params.id as string;
        const task = await this.taskService.getTaskById(id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    }

    updateTask = async (req: Request, res: Response) => {
        const  id  = req.params.id as string;
        const taskData = req.body;
        const updatedTask = await this.taskService.updateTask(id, taskData);
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    }

    deleteTask = async (req: Request, res: Response) => {
        const  id  = req.params.id as string;
        await this.taskService.deleteTask(id);
        res.status(204).send();
    }

    listTasksByUserId = async (req: Request, res: Response) => {
        const  userId  = req.params.userId as string;
        const tasks = await this.taskService.listTasksByUserId(userId);
        res.status(200).json(tasks);
    }
}