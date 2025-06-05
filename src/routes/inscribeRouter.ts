import express, { Request, Response } from 'express';
import * as inscribeController  from '../controllers/inscribeController';
import { Inscribe } from '../models/inscribeModel';
const inscribeRouter = express.Router();

inscribeRouter.post('/', async (req: Request, res: Response) => {
    const newInscribe: Inscribe = req.body;
    inscribeController.create(newInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
inscribeRouter.get('/', async (req: Request, res: Response) => {
    inscribeController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
inscribeRouter.get('/:cod_e', (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    inscribeController.getOne(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
inscribeRouter.put('/', async (req: Request, res: Response) => {
    const newInscribe: Inscribe = req.body;
    inscribeController.update(newInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
})
inscribeRouter.delete('/:cod_a', (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
    inscribeController.delete_i(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
 
export{inscribeRouter};