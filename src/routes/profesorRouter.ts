import express, { Request, Response } from 'express';
import * as profesorController from '../controllers/profesorController';
import { Profesor } from '../models/profesorModel';
const profesorRouter = express.Router();

profesorRouter.post('/', async (req: Request, res: Response) => {
    const newProfesor: Profesor = req.body;
    profesorController.create(newProfesor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
profesorRouter.get('/', async (req: Request, res: Response) => {
    profesorController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
profesorRouter.get('/:id_p', (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    profesorController.getOne(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
profesorRouter.put('/', async (req: Request, res: Response) => {
    const newProfesor: Profesor = req.body;
    profesorController.update(newProfesor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
profesorRouter.delete('/:id_p', (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    profesorController.delite(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
}); 

export{profesorRouter};