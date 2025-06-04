import express, { Request, Response } from 'express';
import * as asignaturaController  from '../controllers/asignaturaController';
import { Asignatura } from '../models/asignaturaModel';
const asignaturaRouter = express.Router();

asignaturaRouter.post('/', async (req: Request, res: Response) => {
    const newAsignatura: Asignatura = req.body;
    asignaturaController.create(newAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
asignaturaRouter.get('/', async (req: Request, res: Response) => {
    asignaturaController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
asignaturaRouter.get('/:cod_a', (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
    asignaturaController.getOne(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
})
asignaturaRouter.put('/', async (req: Request, res: Response) => {
    const newAsignatura: Asignatura = req.body;
    asignaturaController.update(newAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
asignaturaRouter.delete('/:cod_a', (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
    asignaturaController.delite(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
 
export{asignaturaRouter};